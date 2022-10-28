import { TypeBedroomRepository, PaginateParams } from '.'
import { TypeBedroom } from './typeBedroom'
import { Sequelize } from 'sequelize/types'
import { DbError } from '../../exceptions/dbError'
import { TypeRoomSequelize } from '../../database/modelSequelize/type_room'



export class TypeBedroomRepositorySequelize implements TypeBedroomRepository {
  sequelize: Sequelize['models']['room_type']
  constructor() {
    this.sequelize = TypeRoomSequelize
  }

  async paginate({
    filter,
    pageSize,
    page,
  }:PaginateParams): Promise<TypeBedroom[] | number> {
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
        attributes:['id','name','color'],
        });
    return response.map((bedroom) => new TypeBedroom(bedroom.toJSON())) ;
   
  }
  async findById(id: string): Promise<TypeBedroom> {
    console.log(id)
    const response = await this.sequelize.findByPk(id,{
      attributes:['id','room_types','status','guest_id'],
    })
    console.log(response)
    if (response) {
      return new TypeBedroom(response.toJSON())
    } else {
      throw new DbError('Quarto não encontrado')
    }
  }

}

//
