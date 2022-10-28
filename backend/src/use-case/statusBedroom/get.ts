import {StatusBedroom, StatusBedroomRepository } from '../../models/statusBedroom'
import { Request, UseCase } from '../interface'

export class GetStatusBedroom implements UseCase<undefined, { id: string }, undefined, StatusBedroom> {

  constructor(private readonly statusRepository: StatusBedroomRepository) {}


  async execute(params: Request<undefined, { id: string }>) {

    const { id } = params.params
    const status = await this.statusRepository.findById(id)
    return {
      status: 200,
      body: status
    }
  }
}
