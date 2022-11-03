

import { ReservationsRepository, PaginateParams } from '.'
import { Reservations} from './reservations'
import { GuestSequelize, ReservationsSequelize} from '../../database'
import { Sequelize } from 'sequelize/types'
import { DbError } from '../../exceptions/dbError'



export class ReservationsRepositorySequelize implements ReservationsRepository {
  sequelize: Sequelize['models']['Reservations']
  guest: Sequelize['models']['Guest']

  constructor() {
    this.sequelize = ReservationsSequelize
    this.guest = GuestSequelize
    
  }
    async save(reservations: Reservations): Promise<void> {
   
    await this.sequelize.create(reservations.data)
  }
  async paginate({
    filter,
    pageSize,
    page,
  }:PaginateParams): Promise<Reservations[] | number> {
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
    return response.map((reservations) => new Reservations(reservations.toJSON())) ;
   
  }
  async findById(id: string): Promise<Reservations> {
    console.log(id)
    const response = await this.sequelize.findByPk(id,{
      attributes:['id','checkin','checkout','bedroom_id'],
    })
    console.log(response)
    if (response) {
      return new Reservations(response.toJSON())
    } else {
      throw new DbError('Reserva não encontrada')
    }
  }

  async delete(id: string): Promise<void> {
    await this.sequelize.destroy({
      where: {
        id: id,
    }})
  
  }

  async update(id: string, reservations: Reservations): Promise<void> {
    await this.sequelize.update(reservations.data, {
      where: {
        id: id,
      },
    })
  }
}

//
