import { Guest, GuestConstructor } from './../guest/guest';
import { BedroomSequelize } from './../../database/modelSequelize/bedroom';
import { BedroomRepository, PaginateParams } from '.'
import { Bedroom } from './bedroom'
import { GuestSequelize} from '../../database'
import { Sequelize } from 'sequelize/types'
import { DbError } from '../../exceptions/dbError'



export class BedroomRepositorySequelize implements BedroomRepository {
  sequelize: Sequelize['models']['Bedroom']
  guest: Sequelize['models']['Guest'];
  constructor() {
    this.sequelize = BedroomSequelize
    this.guest = GuestSequelize
  }
    async save(bedroom: Bedroom): Promise<void> {
    await this.guest.create(bedroom.guest.data)
    await this.sequelize.create(bedroom.data)
  }
  async paginate({
    filter,
    pageSize,
    page,
  }:PaginateParams): Promise<Bedroom[] | number> {
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
    return response.map((bedroom) => new Bedroom(bedroom.toJSON())) ;
   
  }
  async findById(id: string): Promise<Bedroom> {
    console.log(id)
    const response = await this.sequelize.findByPk(id,{
      attributes:['id','room_types','status','guest_id'],
    })
    console.log(response)
    if (response) {
      return new Bedroom(response.toJSON())
    } else {
      throw new DbError('Quarto não encontrado')
    }
  }
  async findByroom_types(room_types: string): Promise<Bedroom | undefined> {
    const response = await this.sequelize.findOne({
      where: {
        room_types: room_types,
    }, attributes:['id','room_types','status','guest_id'],
    })
    if (response) {
      const bedroom = response.toJSON()
      const res = await this.guest.findByPk(bedroom.guest_id)
      const guest = new Guest(res?.toJSON() as GuestConstructor)
      bedroom.guest = guest
      return new Bedroom(bedroom)
    }
    return undefined;
}
  async delete(id: string): Promise<void> {
    await this.sequelize.destroy({
      where: {
        id: id,
    }})
  
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
