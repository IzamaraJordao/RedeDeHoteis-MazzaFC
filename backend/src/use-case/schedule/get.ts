
import { ScheduleRepository} from '../../models/schedule'
import { Schedule } from '../../models/schedule/schedule'
import { Request, UseCase } from '../interface'

export class GetSchedule implements UseCase <undefined, { id: string }, undefined, Schedule["publicInfo"]>{
  private readonly scheduleRepository : ScheduleRepository
  constructor( scheduleRepository: ScheduleRepository) {
    this.scheduleRepository = scheduleRepository
  }
  async execute(params: Request<undefined, { id: string }>) {
    const { id } = params.params
    console.log(params.params)
    const schedule = await this.scheduleRepository.findById(id)
    return {
      status: 200,
      body: schedule.publicInfo,
    }
  }
}

// pegar os tipo de quarto 


 
