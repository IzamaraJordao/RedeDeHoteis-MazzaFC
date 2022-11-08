import { DataToken } from '../../helpers/auth'
import { Request, Response, UseCase } from './../interface/index'

type ScheduleRepository = {
  getGeneralInfo: () => Promise<GetGeneralInfoResponse>
}

type GetGeneralInfoResponse = {
  totalGuests: number
  totalBedroomsOccupancy: number
  totalCheckInProgress: number
  totalCheckOutProgress: number
}

type GetGeneralInfoConstructor = {
  scheduleRepository: ScheduleRepository
}

export class GetGeneralInfo
  implements UseCase<undefined, undefined, undefined, GetGeneralInfoResponse>
{
  repository: ScheduleRepository
  constructor(models: GetGeneralInfoConstructor) {
    this.repository = models.scheduleRepository
  }
  async execute(
    request: Request<undefined, undefined, undefined>,
    dataToken?: DataToken,
  ): Response<GetGeneralInfoResponse> {
    const response = await this.repository.getGeneralInfo()

    return {
      body: response,
      status: 200,
    }
  }
}
