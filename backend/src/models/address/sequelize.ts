import { AddressRepository } from '.'
import { Address } from './address'
import { sequelize } from '../../database'
import { Sequelize } from 'sequelize/types'
import { DbError } from '../../exceptions/dbError'

export class AddressRepositorySequelize implements AddressRepository {
  sequelize: Sequelize['models']['Address']
  constructor() {
    this.sequelize = sequelize.models.Address
  }
  async save(address: Address): Promise<void> {
    await this.sequelize.create(address.data)
  }
  paginate(): Promise<Address[]> {
    throw new Error('Method not implemented.')
  }
  async findById(id: string): Promise<Address> {
    const response = await this.sequelize.findByPk(id)
    if (response) {
      return new Address(response.toJSON())
    } else {
      throw new DbError('Endereço não encontrado')
    }
  }
  async findByCep(cep: string): Promise<Address[]> {
    const response = await this.sequelize.findAll({
      where: {
        cep: cep,
      },
    })
    if (response.length > 0) {
      return response.map((address) => new Address(address.toJSON()))
    } else {
      throw new DbError('Cep não encontrado')
    }
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async update(id: string, address: Address): Promise<void> {
    await this.sequelize.update(address.data, {
      where: {
        id: id,
      },
    })
  }
}

//
