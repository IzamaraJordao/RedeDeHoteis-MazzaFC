import { UseCase } from './../interface';
import { HttpError } from './../../exceptions/httpError'

import {
  EmployeeRepository,
  Employee,
  EmployeeConstructor,
} from '../../models/employees'
import { Request } from '../interface'

export class CreateEmployee implements UseCase<EmployeeConstructor,undefined,undefined,string> {
  constructor(private readonly employeeRepository: EmployeeRepository) {}
  async execute(params: Request<EmployeeConstructor>) {
    const employee = new Employee(params.body)
    const employeeFounded = await this.employeeRepository.findByEmail(
      employee.email,
    )
    if (employeeFounded) {
      throw new HttpError('Email já cadastrado', 400)
    }
    await this.employeeRepository.save(employee)
    return {  
      status: 201,
      body:'Funcionário criado com sucesso'
    }
  }
}
