import { GuestRepository } from '.'
import { Guest } from './guest'
import { sequelize } from '../../database'
import { Sequelize } from 'sequelize/types'
import { DbError } from '../../exceptions/dbError'
import { PaginateParams } from '../employees'
import { Address } from '../address'



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

  async paginate({ filter, pageSize, page }: PaginateParams): Promise<Guest[] | number> {
    if (pageSize === 0) {
      return await this.sequelize.count({
        where: filter
      })
    }
    const response = await this.sequelize.findAll(
      {
        where: filter,
        offset: (page - 1) * pageSize,
        limit: pageSize,
        include:[{
          model: this.address,  
          as: 'Address', 
          attributes: ['id','street','number','complement','neighborhood','city','state','zip_code']
        }]

      });
      // console.log(response.map((guest)=> guest.toJSON()))

    return response.map((guest ) => new Guest({...guest.toJSON(), address: new Address(guest.toJSON().Address )  })) ;
  } 

  async findById(id: string): Promise<Guest> {
    const response = await this.sequelize.findByPk(id,{
          include:[{
            model: this.address,
            as: 'Address',
            attributes: ['id','street','number','complement','neighborhood','city','state','zip_code']
          }]
    })
    if (response) {
      return new Guest({...response.toJSON(), address: new Address(response.toJSON().Address )  })
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
    if (guest) {
      return new Guest(guest.toJSON())
    }
    return undefined;
  }
  async delete(id: string): Promise<void> {
    await this.sequelize.destroy({
      where: {
        id: id,
      }
    })

  }
  async update(id: string, guest: Guest): Promise<void> {
    await this.sequelize.update(guest.data, {
      where: {
        id: id,
      },
    })
    await this.address.update(guest.address.data, {
      where: {
        id: guest.address.data.id,
      },
    })

}
}


//
