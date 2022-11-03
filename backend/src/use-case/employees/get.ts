import { Employee, EmployeeRepository } from '../../models/employees'
import { Request, UseCase } from '../interface'

export class GetEmployee implements UseCase <undefined, { id: string }, undefined, Employee["publicInfo"]>{
  private readonly employeeRepository : EmployeeRepository
  constructor( employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository
  }
  async execute(params: Request<undefined, { id: string }>) {
    const { id } = params.params
    console.log(params.params)
    const employee = await this.employeeRepository.findById(id)
    return {
      result: employee.publicInfo,
      status: 200,
      body: employee.publicInfo,
    }
  }
}


