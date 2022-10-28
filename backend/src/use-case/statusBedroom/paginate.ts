import { PaginateParams } from '../../models/typeBedroom/index'
import { Request, ReturnPaginate, UseCase } from '../interface'
import { StatusBedroomRepository, StatusBedroom } from '../../models/statusBedroom'

export class PaginateStatus
  implements
  UseCase<
    undefined,
    undefined,
    PaginateParams,
    ReturnPaginate<StatusBedroom['publicInfo']>
  >

{
  private readonly typeRepository: StatusBedroomRepository
  constructor(statusRepository: StatusBedroomRepository) {
    this.typeRepository = statusRepository
  }

  async execute(params: Request<undefined, undefined, PaginateParams>) {
    let { page, pageSize, filter } = params.query
    page = Number(page) || 1  // se existr page, se não 1 (como se fosse um if ternario)
    pageSize = Number(pageSize) || 10 // se existir pageSize, se não 10
    filter = JSON.parse(filter as unknown as string || '{}')
    console.log(typeof filter)
    let filterSanitized = {}
    const keys = Object.keys(filter).filter((current, index) => {
      return StatusBedroom.filter().includes(current)
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
    const statusBedroom = await this.typeRepository.paginate({ page, pageSize, filter, }) as StatusBedroom[]
    const total = await this.typeRepository.paginate({ page, pageSize: 0, filter, }) as number

    return {
      status: 200,
      body: {
        result: statusBedroom.map((current, index) => current.publicInfo),
        current: page,
        pageSize,
        total: total,
      },
    }
  }
}
