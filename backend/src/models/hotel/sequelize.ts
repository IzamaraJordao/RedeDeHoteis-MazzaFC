import { HotelRepository } from '.';
import { Hotel } from './hotel';
import { AddressSequelize, HotelSequelize} from "../../database";
import { Sequelize } from "sequelize/types";
import { DbError } from '../../exceptions/dbError';
import { Address, AddressConstructor } from '../address';
import { PaginateParams } from '../employees';




export class HotelRepositorySequelize implements HotelRepository {
  sequelize: Sequelize['models']['Hotel']
  address: Sequelize['models']['Address'];
  
  constructor() {
    this.sequelize = HotelSequelize
  
    this.address = AddressSequelize
  }
   async findByCnpj(cnpj: string): Promise<Hotel | undefined> {
    const response = await this.sequelize.findOne({
      where: {
        cnpj: cnpj,
      },
      attributes: ['id', 'name', 'cnpj', 'email', 'phone', 'email'],
    })
    if(response) {
      const hotel = response.toJSON()
      const res = await this.address.findByPk(hotel.address_id)
      const address = new Address(res?.toJSON() as AddressConstructor)
      hotel.address = address
      return new Hotel(hotel)
    }else {
      return undefined
    }
  }
  async save(hotel: Hotel): Promise<void> {
    await this.address.create(hotel.address.data)
    await this.sequelize.create(hotel.data )
  }
  async paginate({ filter, pageSize, page, }:PaginateParams ): Promise<Hotel[] | number> {
    
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
    return response.map((employee) => new Hotel(employee.toJSON())) ;
  }



  async findById(id: string): Promise<Hotel> {
    const response = await this.sequelize.findByPk(id)
    if (response) {
      return new Hotel(response.toJSON())
    } else {
      throw new DbError('Endereço não encontrado')
    }
  }
 
  
  async delete(id: string): Promise<void> {
    await this.sequelize.destroy({
      where: {
        id: id,
    }})
  
  }
  async update(id: string, hotel: Hotel): Promise<void> {
    await this.sequelize.update(hotel.data, {
      where: {
        id: id,
      },
    })
  }
}

