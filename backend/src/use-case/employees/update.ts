import { UseCase } from './../interface';

import {
  EmployeeRepository,
  Employee,
  EmployeeConstructor,
} from '../../models/employees';
import { Request } from '../interface'
import { Address } from '../../models/address';


export class UpdateEmployee implements UseCase<EmployeeConstructor,undefined,undefined,string> {

  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(params: Request<EmployeeConstructor>) {
    const address = new Address(params.body.address)
    params.body.address = address
    const {id} = params.params
    const employee = new Employee(params.body)
    console.log(id, employee)
    await this.employeeRepository.update(id, employee)
    return {  
      status: 201,
      body:'Funcionário alterado com sucesso'
    }
    }

  }
//
