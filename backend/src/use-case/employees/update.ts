import { UseCase } from './../interface';

import {
  EmployeeRepository,
  Employee,
  EmployeeConstructor,
} from '../../models/employees';
import { Request } from '../interface'


export class UpdateEmployee implements UseCase<EmployeeConstructor,undefined,undefined,string> {

  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(params: Request<EmployeeConstructor>) {
    const {id} = params.params
    const employee = new Employee(params.body)

    await this.employeeRepository.update(id, employee)
    return {  
      status: 201,
      body:'Funcionario alterado com sucesso'
    }
    }
  }
//
