import { ScheduleRepository } from '../../models/schedule'
import { Schedule } from '../../models/schedule/schedule'
import { Request, UseCase } from '../interface'

export class FindAllSchedule
  implements UseCase<undefined, undefined, undefined, Schedule['publicInfo'][]>
{
  private readonly scheduleRepository: ScheduleRepository
  constructor(scheduleRepository: ScheduleRepository) {
    this.scheduleRepository = scheduleRepository
  }
  async execute(params: Request<undefined, undefined>) {
    const schedule = await this.scheduleRepository.findAll()
    return {
      status: 200,
      body: schedule.map((s) => s.publicInfo),
    }
  }
}





