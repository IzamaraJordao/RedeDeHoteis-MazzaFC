import { EmployeeRepository } from '.';
import { Employee } from './employee';
import { sequelize } from "../../database";
import { HasOne, Sequelize } from "sequelize/types";
import { DbError } from '../../exceptions/dbError';
import { Address } from '../address';



export class EmployeeRepositorySequelize implements EmployeeRepository {
  sequelize: Sequelize['models']['Employee']
  association: HasOne<any, any>;
  address: Sequelize['models']['Address'];
  
  constructor() {
    this.sequelize = sequelize.models.Employee
    this.association = this.sequelize.hasOne(sequelize.models.Address)
    this.address = sequelize.models.Address
  }
  async save(employee: Employee): Promise<void> {
    await this.address.create(employee.address.data)
    await this.sequelize.create(employee.data )
  }
  paginate(): Promise<Employee[]> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<Employee> {
    const response = await this.sequelize.findByPk(id)
    if (response) {
      return new Employee(response.toJSON())
    } else {
      throw new DbError('Endereço não encontrado')
    }
  }
  async findByEmail(email: string): Promise<Employee | undefined> {
    const response = await this.sequelize.findOne({
      where: {
        email: email,
      },attributes: ['id', 'name', 'rg', 'cpf', 'email', 'phone', 'note', 'active', 'password', 'hotel_id', 'is_first_access', 'address_id'],
    })
    if (response) {
      const employee = response.toJSON()
      const address = new Address(employee.address)
      employee.address = address
      return new Employee(employee)
    } else {
      return undefined
      // throw new DbError('Email não encontrado')
    }
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async update(id: string, employee: Employee): Promise<void> {
    await this.sequelize.update(employee.data, {
      where: {
        id: id,
      },
    })
  }
}

