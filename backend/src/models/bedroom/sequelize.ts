import { BedroomRepository } from '.'
import { Bedroom } from './bedroom'
import { sequelize } from '../../database'
import { Sequelize } from 'sequelize/types'
import { DbError } from '../../exceptions/dbError'



export class BedroomRepositorySequelize implements BedroomRepository {
  sequelize: Sequelize['models']['Bedroom']
  guest: Sequelize['models']['Guest'];
  constructor() {
    this.sequelize = sequelize.models.Bedroom
    this.guest = sequelize.models.Guest
  }
    async save(bedroom: Bedroom): Promise<void> {
    await this.guest.create(bedroom.guest_id.data)
    await this.sequelize.create(bedroom.data)
  }
  paginate(): Promise<Bedroom[]> {
    throw new Error('Method not implemented.')
  }
  async findById(id: string): Promise<Bedroom> {
    const response = await this.sequelize.findByPk(id)
    if (response) {
      return new Bedroom(response.toJSON())
    } else {
      throw new DbError('Quarto não encontrado')
    }
  }
  async findBytipo(tipo: string): Promise<Bedroom | undefined> {
    const bedroom = await this.sequelize.findOne({
      where: {
        tipo: tipo,
    } 
    })
    if (bedroom) {
      return new Bedroom(bedroom.toJSON())
    }
    return undefined;
}
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async update(id: string, bedroom: Bedroom): Promise<void> {
    await this.sequelize.update(bedroom.data, {
      where: {
        id: id,
      },
    })
  }
}

//
