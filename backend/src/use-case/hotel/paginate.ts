import { PaginateParams } from './../../models/employees/index'
import { Request, ReturnPaginate, UseCase } from '../interface'
import { Hotel, HotelRepository } from '../../models/hotel'

export class PaginateHotel
  implements
  UseCase<
    undefined,
    undefined,
    PaginateParams,
    ReturnPaginate<Hotel['publicInfo']>
  >
{
  private readonly hotelRepository: HotelRepository
  constructor(hotelRepository: HotelRepository) {
    this.hotelRepository = hotelRepository
  }
  async execute(params: Request<undefined, undefined, PaginateParams>) {
    let { page, pageSize, filter } = params.query
    page = Number(page) || 1  // se existr page, se não 1 (como se fosse um if ternario)
    pageSize = Number(pageSize) || 10 // se existir pageSize, se não 10
    filter = JSON.parse(filter as unknown as string || '{}')
    console.log(typeof filter)
    let filterSanitized = {}
    const keys = Object.keys(filter).filter((current, index) => {
      return Hotel.filter().includes(current)
    }
    )
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
    const hotel = await this.hotelRepository.paginate({ page, pageSize, filter, }) as Hotel[]
    const total = await this.hotelRepository.paginate({ page, pageSize: 0, filter, }) as number

    return {
      status: 200,
      body: {
        result: hotel.map((current, index) => current.publicInfo),
        current: page,
        pageSize,
        total: total,
      },
    }
  }
}
