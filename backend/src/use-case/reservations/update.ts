import { UseCase } from '../interface';

import {
  ReservationsRepository,
  Reservations,
  ReservationsConstructor,
} from '../../models/reservations';
import { Request } from '../interface'
// import { Address } from '../../models/address';

export class UpdateReservations implements UseCase<ReservationsConstructor,undefined,undefined,string> {

  constructor(private readonly reservationsRepository: ReservationsRepository) {}

  async execute(params: Request<ReservationsConstructor>) {
    // const address = new Address(params.body.address)
    // params.body.address = address
    const {id} = params.params
    const reservations = new Reservations(params.body)

    await this.reservationsRepository.update(id, reservations)
    return {  
      status: 201,
      body:'Reserva alterada com sucesso'
    }
    }
  }

