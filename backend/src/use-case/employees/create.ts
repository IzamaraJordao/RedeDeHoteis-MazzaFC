import { UseCase } from './../interface';
import { HttpError } from './../../exceptions/httpError'

import {
  EmployeeRepository,
  Employee,
  EmployeeConstructor,
} from '../../models/employees'
import { Request } from '../interface'
import { Address } from '../../models/address';
import { IEncrypter } from '../../helpers/encrypter';

export class CreateEmployee implements UseCase<EmployeeConstructor,undefined,undefined,string> {
  constructor(private readonly employeeRepository: EmployeeRepository,
     private readonly encrypter: IEncrypter) {

  }
  async execute(params: Request<EmployeeConstructor>) {
    const address = new Address(params.body.address);
    params.body.address = address
    const employee = new Employee(params.body)
    const employeeFounded = await this.employeeRepository.findByEmail(
      employee.email,
    )
    if (employeeFounded) {
      throw new HttpError('Email já cadastrado', 400)
    }
    employee.password = await this.encrypter.encrypt(employee.password)
    
    await this.employeeRepository.save(employee)
    return {  
      status: 200,
      body:'Funcionário criado com sucesso'
    }
  }
}
