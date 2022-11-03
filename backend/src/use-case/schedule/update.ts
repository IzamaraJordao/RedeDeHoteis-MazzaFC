import { UseCase } from '../interface';

import {
  ScheduleRepository,
 
  ScheduleConstructor,
} from '../../models/schedule';
import { Request } from '../interface'
import { Schedule } from '../../models/schedule/schedule';



export class UpdateSchedule implements UseCase<ScheduleConstructor,undefined,undefined,string> {

  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async execute(params: Request<ScheduleConstructor>) {
    const {id} = params.params
    const schedule = new Schedule(params.body)
    console.log(id, schedule)
    await this.scheduleRepository.update(id, schedule)
    return {  
      status: 201,
      body:'Agendamento alterado com sucesso'
    }
    }

  }
//
