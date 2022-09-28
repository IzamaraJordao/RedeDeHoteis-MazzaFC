import { UseCase } from '../interface';
import { HttpError } from '../../exceptions/httpError'

import {
  ReservationsRepository,
  Reservations,
  ReservationsConstructor,
} from '../../models/reservations'
import { Request } from '../interface'


export class CreateReservations implements UseCase<ReservationsConstructor,undefined,undefined,string> {
  constructor(private readonly reservationsRepository: ReservationsRepository) {

  }
  async execute(params: Request<ReservationsConstructor>) {
    const reservations = new Reservations(params.body)
    const reservationsFounded = await this.reservationsRepository.findById(
      reservations.id,
    )
    if (reservationsFounded) {
      throw new HttpError('Reserva já cadastrado', 400)
    }
    
    await this.reservationsRepository.save(reservations)
    return {  
      status: 201,
      body:'Reserva criada com sucesso'
    }
  }
}
