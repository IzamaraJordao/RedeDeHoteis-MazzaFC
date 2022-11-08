import { differenceInDays, parseISO } from 'date-fns'
import { ValidationError } from '../../exceptions/validationError'
import { DataToken } from '../../helpers/auth'
import { addDate, subtractDate } from '../../helpers/dateFunctions'
import { Bedroom, BedroomRepository } from '../../models/bedroom'
import { Guest } from '../../models/guest'
import { Request, Response, UseCase } from './../interface/index'

type GetHotelStatusQueryParams = {
  from?: string
  to?: string
}

type GetHotelStatusResponse = {
  period: {
    from: string | Date
    to: string | Date
  }
  bedroomsInfo: {
    date: string | Date
    name: Bedroom['name']
    floor: Bedroom['floor']
    guest: Guest['name']
    type: Bedroom['']
  }[]
}

type GetHotelStatusConstructor = {
  bedroomRepository: BedroomRepository
}
const DATE_DIFF_IN_DAYS = 6

export class GetHotelStatus
  implements
    UseCase<
      undefined,
      undefined,
      GetHotelStatusQueryParams,
      GetHotelStatusResponse
    >
{
  bedroomRepository: BedroomRepository

  constructor(params: GetHotelStatusConstructor) {
    this.bedroomRepository = params.bedroomRepository
  }
  async execute(
    request: Request<undefined, undefined, GetHotelStatusQueryParams>,
    dataToken?: DataToken | undefined,
  ): Response<GetHotelStatusResponse> {
    let { from, to } = request.query
    if (from == undefined) {
      from = subtractDate(new Date(), { days: 1 }).toISOString()
    } else {
      try {
        parseISO(from)
      } catch {
        throw new ValidationError('Formato de data de início inválido!')
      }
    }
    if (to == undefined) {
      to = addDate(new Date(), { days: 4 }).toISOString()
    } else {
      try {
        parseISO(to)
      } catch {
        throw new ValidationError('Formato de data final inválido!')
      }
    }


    const bedroomList = await this.bedroomRepository.getAll(
      dataToken?.hotel_id as string,
    )
    const bedroomIds = bedroomList.map((bedroom) => bedroom.id)

    const bedroomsInfo: GetHotelStatusResponse['bedroomsInfo'] = []
    return {
      status: 200,
      body: {
        period: {
          from: from,
          to: to,
        },
        bedroomsInfo: bedroomsInfo,
      },
    }
  }
}
