import { HotelRepository } from '.';
import { Hotel } from './hotel';
import { sequelize } from "../../database";
import { Sequelize } from "sequelize/types";
import { DbError } from '../../exceptions/dbError';




export class HotelRepositorySequelize implements HotelRepository {
  sequelize: Sequelize['models']['Hotel']
  address: Sequelize['models']['Address'];
  
  constructor() {
    this.sequelize = sequelize.models.Hotel
  
    this.address = sequelize.models.Address
  }
  findByCnpj(cnpj: number): Promise<Hotel | undefined> {
    throw new Error('Method not implemented.');
  }
  async save(hotel: Hotel): Promise<void> {
    await this.address.create(hotel.address.data)
    await this.sequelize.create(hotel.data )
  }
  paginate(): Promise<Hotel[]> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<Hotel> {
    const response = await this.sequelize.findByPk(id)
    if (response) {
      return new Hotel(response.toJSON())
    } else {
      throw new DbError('Endereço não encontrado')
    }
  }
 
  
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async update(id: string, hotel: Hotel): Promise<void> {
    await this.sequelize.update(hotel.data, {
      where: {
        id: id,
      },
    })
  }
}

