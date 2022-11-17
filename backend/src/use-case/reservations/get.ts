import { Reservations } from '../../models/reservations/reservations';
import { Request, UseCase } from '../interface'
import { ReservationsRepository } from '../../models/reservations';

export class GetReservations implements UseCase <undefined, { id: string }, undefined, Reservations["publicInfo"]>{
  private readonly reservationsRepository : ReservationsRepository
  constructor( reservationsRepository: ReservationsRepository) {
    this.reservationsRepository = reservationsRepository
  }
  async execute(params: Request<undefined, { id: string }>) {
    const { id } = params.params
    const reservations = await this.reservationsRepository.findById(id)
    return {
      status: 200,
      body: reservations.publicInfo,
    }
  }
}


