import { UseCase } from '../interface'
import { HttpError } from '../../exceptions/httpError'

import {
  ReservationsRepository,
  Reservations,
  ReservationsConstructor,
} from '../../models/reservations'
import { Request } from '../interface'

export class CreateReservations
  implements UseCase<ReservationsConstructor, undefined, undefined, string>
{
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}
  async execute(params: Request<ReservationsConstructor>) {
    // identificar quartos do hotel do tipo escolhido ok
    // identificar se existem quartos disponiveis para o periodo escolhida ok
    // verificar se não há reservas no periodo escolhido para os quartos disponiveis
    // criar reserva, para o primeiro quarto disponivel
    // criar associacao entre a reserva e guests (hospedes)
    //alterar agenda para o periodo escolhido para o quarto escolhido

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
      body: 'Reserva criada com sucesso',
    }
  }
}
