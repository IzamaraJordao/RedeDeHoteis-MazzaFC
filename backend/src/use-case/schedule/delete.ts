import { ScheduleRepository } from '../../models/schedule'
import { Request, UseCase } from '../interface'

export class DeleteSchedule implements UseCase<undefined,{id: string},undefined,string> {

  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  
  async execute(params: Request<undefined, { id: string }>) {
    const { id } = params.params

    await this.scheduleRepository.delete(id)
    return{
      status: 200,
      body: 'Agendamento deletado com sucesso'
    }
  }
}
