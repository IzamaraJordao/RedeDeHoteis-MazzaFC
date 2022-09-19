import { GuestRepository } from '.'
import { Guest } from './guest'
import { sequelize } from '../../database'
import { Sequelize } from 'sequelize/types'
import { DbError } from '../../exceptions/dbError'



export class GuestRepositorySequelize implements GuestRepository {
  sequelize: Sequelize['models']['Guest']
  address: Sequelize['models']['Address'];
  constructor() {
    this.sequelize = sequelize.models.Guest
    this.address = sequelize.models.Address
  }
    async save(guest: Guest): Promise<void> {
    await this.address.create(guest.address.data)
    await this.sequelize.create(guest.data)
  }
  paginate(): Promise<Guest[]> {
    throw new Error('Method not implemented.')
  }
  async findById(id: string): Promise<Guest> {
    const response = await this.sequelize.findByPk(id)
    if (response) {
      return new Guest(response.toJSON())
    } else {
      throw new DbError('Cliente não encontrado')
    }
  }
  async findByCpf(cpf: string): Promise<Guest | undefined> {
    const guest = await this.sequelize.findOne({
      where: {
        cpf: cpf,
    } 
    })
    if (guest){
      return new Guest(guest.toJSON())
    }
    return undefined;
}
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async update(id: string, guest: Guest): Promise<void> {
    await this.sequelize.update(guest.data, {
      where: {
        id: id,
      },
    })
  }
}

//
