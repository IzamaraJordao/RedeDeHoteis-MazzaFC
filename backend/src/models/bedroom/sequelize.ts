import { BedroomSequelize } from './../../database/modelSequelize/bedroom';
import { BedroomRepository } from '.'
import { Bedroom } from './bedroom'
import { Sequelize } from 'sequelize'


export class BedroomRepositorySequelize implements BedroomRepository {
  sequelize: Sequelize['models']['Bedroom']
  constructor() {
    this.sequelize = BedroomSequelize
   
  }
  async getFloor(hotel_id: string): Promise<Bedroom["floor"][]> {
    const response = await this.sequelize.findAll({
      attributes:[
        [Sequelize.fn('DISTINCT', Sequelize.col('floor')), 'floor']
      ],
      where:{hotel_id: hotel_id}
    })
    return response.map((bedroom) => bedroom.toJSON().floor)
  }
  async getBedrooms(hotel_id: string, floor: string): Promise<Bedroom[]> {
    const response =  await this.sequelize.findAll({
      attributes: Bedroom.fields(),
      where:{hotel_id: hotel_id, floor: floor}
      })
    return response.map((bedroom) => new Bedroom(bedroom.toJSON()))
  }

  async update(id: string, bedroom: Bedroom): Promise<void> {
    await this.sequelize.update(bedroom.data, {
      where: {
        id: id,
      },
    })
  }

  async saveMany(bedrooms : Bedroom[]): Promise<void> {
    await this.sequelize.bulkCreate(bedrooms.map((bedroom) => bedroom.data))
  }
  
}

//
