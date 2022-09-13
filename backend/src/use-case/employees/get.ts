import { EmployeeRepository } from '../../models/employees'
import { Request, UseCase } from '../interface'

export class GetEmployee implements UseCase <undefined, { id: string }, undefined, Employee >{
  private readonly employeeRepository : EmployeeRepository
  constructor( employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository
  }
  async execute(params: Request<undefined, { id: string }>) {
    const { id } = params.params
    const employee = await this.employeeRepository.findById(id)
    return {
      status: 200,
      body: employee,
    }
  }
}

export class Employee {}
