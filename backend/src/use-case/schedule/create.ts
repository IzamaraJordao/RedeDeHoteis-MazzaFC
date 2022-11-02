import { UseCase } from '../interface'
import { HttpError } from '../../exceptions/httpError'

import { ScheduleRepository, ScheduleConstructor } from '../../models/schedule'
import { Request } from '../interface'
import { Schedule } from '../../models/schedule/schedule'

export class CreateSchedule
  implements UseCase<ScheduleConstructor, undefined, undefined, string>
{
  constructor(private readonly scheduleRepository: ScheduleRepository) {}
  async execute(params: Request<ScheduleConstructor>) {
    const schedule = new Schedule(params.body)
    const ScheduleFounded = await this.scheduleRepository.findById(schedule.id)
    if (ScheduleFounded) {
      throw new HttpError('Agendamento já existe', 400)
    }

    await this.scheduleRepository.save(schedule)
    return {
      status: 201,
      body: 'Agendamento criado  com sucesso',
    }
  }
}
