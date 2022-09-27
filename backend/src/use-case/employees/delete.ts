import { EmployeeRepository } from '../../models/employees'
import { Request, UseCase } from '../interface'

export class DeleteEmployee implements UseCase<undefined,{id: string},undefined,string> {

  constructor(private readonly employeeRepository: EmployeeRepository) {}

  
  async execute(params: Request<undefined, { id: string }>) {
    const { id } = params.params

    await this.employeeRepository.delete(id)
    return{
      status: 200,
      body: 'Funcionário deletado com sucesso'
    }
  }
}
