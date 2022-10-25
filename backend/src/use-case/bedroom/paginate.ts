import { PaginateParams } from './../../models/bedroom/index'
import { Bedroom, BedroomRepository } from '../../models/bedroom'
import { Request, ReturnPaginate, UseCase } from '../interface'

export class PaginateBedroom
  implements
    UseCase<
      undefined,
      undefined,
      PaginateParams,
      ReturnPaginate<Bedroom['publicInfo']>
    >
{
  private readonly bedroomRepository: BedroomRepository
  constructor(bedroomRepository: BedroomRepository) {
    this.bedroomRepository = bedroomRepository
  }
  async execute(params: Request<undefined, undefined, PaginateParams>) {
    let { page, pageSize, filter } = params.query
    page = Number (page) || 1  // se existr page, se não 1 (como se fosse um if ternario)
    pageSize = Number (pageSize) || 10 // se existir pageSize, se não 10
    filter = JSON.parse (filter as unknown as string || '{}')
    console.log(typeof filter)
    let filterSanitized = {}
    const keys = Object.keys(filter).filter((current, index) => {
      if (Bedroom.filter().includes(current)) {
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
    const bedroom = await this.bedroomRepository.paginate({
      page,
      pageSize,
      filter,
    }) as Bedroom[]
    const total = await this.bedroomRepository.paginate({
      page,
      pageSize: 0,
      filter,
    }) as number
    return {
      status: 200,
      body: {
        result: bedroom.map((current, index) => current.publicInfo),
        current: page,
        pageSize,
        total: total,
      },
    }
  }
}
