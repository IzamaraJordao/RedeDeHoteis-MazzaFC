import { EmployeeRepository, PaginateParams } from '.';
import { Employee } from './employee';
import { AddressSequelize, EmployeeSequelize } from "../../database";
import { Sequelize } from "sequelize/types";
import { DbError } from '../../exceptions/dbError';
import { Address, AddressConstructor } from '../address';



export class EmployeeRepositorySequelize implements EmployeeRepository {
  sequelize: Sequelize['models']['Employee']
  address: Sequelize['models']['Address'];
  
  constructor() {
    this.sequelize = EmployeeSequelize
  
    this.address = AddressSequelize
  }
  async save(employee: Employee): Promise<void> {
    await this.address.create(employee.address.data)
    await this.sequelize.create(employee.data )
  }
  async paginate({
    filter, 
    pageSize,
    page,
  }:PaginateParams ): Promise<Employee[] | number> {
    if(pageSize === 0) {
      return await this.sequelize.count({
        where: filter
      })
    }
    const response =  await this.sequelize.findAll(
      {
        where: filter,
        offset: (page - 1) * pageSize,
        limit: pageSize,
        });
    return response.map((employee) => new Employee(employee.toJSON())) ;
  }


  async findById(id: string): Promise<Employee> {
    console.log(id)
    const response = await this.sequelize.findByPk(id,{
      attributes: ['id', 'name', 'rg', 'cpf', 'email', 'phone', 'note', 'active', 'password', 'hotel_id', 'is_first_access', 'address_id'],
    })
    console.log(response)
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
      const res = await this.address.findByPk(employee.address_id)
      const address = new Address(res?.toJSON() as AddressConstructor)
      employee.address = address
      return new Employee(employee)
    } else {
      return undefined
      // throw new DbError('Email não encontrado')
    }
  }


  async delete(id: string): Promise<void> {
    await this.sequelize.destroy({
      where: {
        id: id,
    }})
  }

  
  async update(id: string, employee: Employee): Promise<void> {
    await this.sequelize.update(employee.data, {
      where: {
        id: id,
      },
    })
  }
}

