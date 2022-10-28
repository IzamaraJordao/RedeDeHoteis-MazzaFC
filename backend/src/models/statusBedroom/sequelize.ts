import { StatusBedroomRepository, PaginateParams } from '.'
import { StatusBedroom } from './statusBedroom'
import { Sequelize } from 'sequelize/types'
import { DbError } from '../../exceptions/dbError'
import { StatusRoomSequelize } from '../../database/modelSequelize/status_room'



export class StatusBedroomRepositorySequelize implements StatusBedroomRepository {
  sequelize: Sequelize['models']['status_room']
  constructor() {
    this.sequelize = StatusRoomSequelize
  }

  async paginate({
    filter,
    pageSize,
    page,
  }:PaginateParams): Promise<StatusBedroom[] | number> {
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
        attributes:['id','name'],
        });
    return response.map((bedroom) => new StatusBedroom(bedroom.toJSON())) ;
   
  }
  async findById(id: string): Promise<StatusBedroom> {
    console.log(id)
    const response = await this.sequelize.findByPk(id,{
      attributes:['id','name'],
    })
    console.log(response)
    if (response) {
      return new StatusBedroom(response.toJSON())
    } else {
      throw new DbError('Quarto não encontrado')
    }
  }

}

//
