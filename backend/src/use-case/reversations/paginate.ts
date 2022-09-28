import { Reservations, ReservationsRepository } from './../../models/reservations';
import { PaginateParams } from '../../models/reservations/index'

import { Request, ReturnPaginate, UseCase } from '../interface'

export class PaginateReservations
  implements
    UseCase<
      undefined,
      undefined,
      PaginateParams,
      ReturnPaginate<Reservations['publicInfo']>
    >
{
  private readonly reservationsRepository: ReservationsRepository
  constructor(reservationsRepository: ReservationsRepository) {
    this.reservationsRepository = reservationsRepository
  }
  async execute(params: Request<undefined, undefined, PaginateParams>) {
    let { page, pageSize, filter } = params.query
    page = Number (page) || 1  // se existr page, se não 1 (como se fosse um if ternario)
    pageSize = Number (pageSize) || 10 // se existir pageSize, se não 10
    filter = JSON.parse (filter as unknown as string) || {}
    console.log(typeof filter)
    let filterSanitized = {}
    const keys = Object.keys(filter).filter((current, index) => {
      if (Reservations.filter().includes(current)) {
        return true
      }
      return false
    })
    keys.forEach((current, index) => {
      if (typeof filter[current] === 'string') {
        // @ts-ignore
        filterSanitized[current] = filter[current]
        // @ts-ignore
          .toLowerCase()
          .replace(/[(),{}[]'"]/gi, '')
      }
      if (typeof filter[current] !== 'string') {
        // @ts-ignore
        filterSanitized[current] = filter[current]
      }
    })
    const reservations = await this.reservationsRepository.paginate({
      page,
      pageSize,
      filter,
    }) as Reservations[]
    const total = await this.reservationsRepository.paginate({
      page,
      pageSize: 0,
      filter,
    }) as number
    return {
      status: 200,
      body: {
        result: reservations.map((current, index) => current.publicInfo),
        current: page,
        pageSize,
        total: total,
      },
    }
  }
}
