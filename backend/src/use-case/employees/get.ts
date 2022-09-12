

import { EmployeeRepository } from '../../Models/employees'
import { Request } from '../interface'

export class GetEmployee {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
  async execute(params: Request<undefined, { id: string }>) {
    const { id } = params.params
    const employee = await this.employeeRepository.findById(id)
    return employee
  }

}

export class Employee {}
