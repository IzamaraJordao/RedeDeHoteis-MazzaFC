import { BedroomSequelize } from './../../database/modelSequelize/bedroom'
import { ScheduleRepository } from '.'
import { Schedule } from './schedule'
import { ScheduleSequelize } from '../../database'
import { Sequelize } from 'sequelize/types'
import { DbError } from '../../exceptions/dbError'

export class ScheduleRepositorySequelize implements ScheduleRepository {
  sequelize: Sequelize['models']['Schedule']
  bedroom: Sequelize['models']['Bedroom']

  constructor() {
    this.sequelize = ScheduleSequelize
    this.bedroom = BedroomSequelize
  }
  // filtrar os quartos disponiveis para o periodo escolhido
  async findFreeBedrooms(
    check_in: string,
    check_out: string,
    hotel_id: string,
  ): Promise<Schedule[]> {
    const response = await this.sequelize.findAll({
      where: {
        data_initial: {
          $between: [check_in, check_out]
           
        },
        bedroom_id: {
          $in: Sequelize.literal(
            `SELECT id 
            FROM bedroom 
            WHERE hotel_id = ${hotel_id}
            AND status_room_id = 1`),
        },
        reservation_id: {
          $ne: null,
        },
      },
    })
    if (response) {
      return response.map((schedule) => new Schedule({ ...schedule.toJSON() }))
    } else {
      throw new DbError('Não há quartos disponíveis')
    }
  }

  // identificar se não existem quartos disponiveis para o periodo escolhida
  async findNotFreeBedrooms(
    check_in: string,
    check_out: string,
    hotel_id: string,
  ): Promise<Schedule[]> {
    const response = await this.sequelize.findAll({
      include:[{
        model: this.bedroom,
        as:'Bedroom',
        attributes: ['id', 'room_status_id'],
        required: true,
     
      where: {
        data_initial: {
          $between: [check_in, check_out],
          $in: Sequelize.literal(
            `SELECT date_initial from rede_hotel.schedule
            WHERE bedroom_id in (SELECT id from bedroom where name <> 'Disponivel')`,
          ),
         
        },
        bedroom_id: {
          $in: Sequelize.literal(
            `SELECT id 
             FROM bedroom 
             WHERE hotel_id = ${hotel_id}
             AND status_room_id = 1`),
             required: true,
        },
        reservation_id: {
          $ne: null,
        },
      },
     
    }]
     
    })
 

    if (response) {
      return response.map((schedule) => new Schedule({ ...schedule.toJSON() }))
    } else {
      throw new DbError('Não há quartos disponíveis')
    }
  }

  async save(Schedule: Schedule): Promise<void> {
    await this.sequelize.create(Schedule.data)
  }

  async findById(id: string): Promise<Schedule> {
    const response = await this.sequelize.findByPk(id, {
      include: [
        {
          model: this.bedroom,
          as: 'Bedroom',
          attributes: ['id', 'status'],
        },
      ],
    })
    if (response) {
      return new Schedule({ ...response.toJSON() })
    } else {
      throw new DbError('Agendamento  não encontrado')
    }
  }

  async findAll(): Promise<Schedule[]> {
    const response = await this.sequelize.findAll({
      include: [
        {
          model: this.bedroom,
          as: 'Bedroom',
          attributes: ['id', 'status'],
        },
      ],
    })
    if (response) {
      return response.map((schedule) => new Schedule({ ...schedule.toJSON() }))
    } else {
      throw new DbError('Agendamentos não encontrados')
    }
  }

  async delete(id: string): Promise<void> {
    await this.sequelize.destroy({
      where: {
        id: id,
      },
    })
  }

  async update(id: string, Schedule: Schedule): Promise<void> {
    await this.sequelize.update(Schedule.data, {
      where: {
        id: id,
      },
    })
  }
}
