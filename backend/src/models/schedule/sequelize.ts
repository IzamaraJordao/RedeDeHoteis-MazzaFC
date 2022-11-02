
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
      throw new DbError('Agenda não encontrado')
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
