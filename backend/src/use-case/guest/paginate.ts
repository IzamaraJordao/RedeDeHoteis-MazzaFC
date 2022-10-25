import { PaginateParams } from './../../models/employees/index'
import { Request, ReturnPaginate, UseCase } from '../interface'
import { Guest, GuestRepository } from '../../models/guest'

export class PaginateGuest
  implements
    UseCase<
      undefined,
      undefined,
      PaginateParams,
      ReturnPaginate<Guest['publicInfo']>
    >
{
  private readonly guestRepository: GuestRepository
  constructor(guestRepository: GuestRepository) {
    this.guestRepository = guestRepository
  }
  async execute(params: Request<undefined, undefined, PaginateParams>) {
    let { page, pageSize, filter } = params.query
    page = Number (page) || 1  // se existr page, se não 1 (como se fosse um if ternario)
    pageSize = Number (pageSize) || 10 // se existir pageSize, se não 10
    filter = JSON.parse (filter as unknown as string || '{}')
    
    let filterSanitized = {}
    const keys = Object.keys(filter).filter((current, index) => {
      if (Guest.filter().includes(current)) {
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
    const guest = await this.guestRepository.paginate({
      page,
      pageSize,
      filter,
    }) as Guest[]
    const total = await this.guestRepository.paginate({
      page,
      pageSize: 0,
      filter,
    }) as number
    return {
      status: 200,
      body: {
        result: guest.map((current, index) => current.publicInfo),
        current: page,
        pageSize,
        total: total,
      },
    }
  }
}
