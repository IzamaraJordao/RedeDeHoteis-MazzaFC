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
    await this.sequelize.create(employee.data , {
      include: [
        {association: this.association}
      ]
    })
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
      },
      include:{
        model: this.address,
        as: 'address'
      }
    })
    if (response) {
      const employee = response.toJSON()
      const address = new Address(employee.address)
      employee.address = address
      return new Employee(employee)
    } else {
      throw new DbError('Email não encontrado')
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

