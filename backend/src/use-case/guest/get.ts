import { Guest, GuestRepository } from '../../models/guest'
import { Request, UseCase } from '../interface'

export class GetGuest implements UseCase <undefined, { id: string }, undefined, Guest["publicInfo"] >{
  private readonly guestRepository : GuestRepository
  constructor( guestRepository: GuestRepository) {
    this.guestRepository = guestRepository
  }
  async execute(params: Request<undefined, { id: string }>) {
    
    const { id } = params.params
    const guest = await this.guestRepository.findById(id)
    return {
      result: guest.publicInfo,
      status: 200,
      body: guest.publicInfo,
    }
  }
}


