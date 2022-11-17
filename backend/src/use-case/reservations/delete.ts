import { ReservationsRepository } from '../../models/reservations';
import { Request, UseCase } from '../interface'

export class DeleteReservations implements UseCase<undefined,{id: string},undefined,string> {
  constructor(private readonly reservationsRepository: ReservationsRepository) {}
  async execute(params: Request<undefined, { id: string }>) {
    const { id } = params.params

    await this.reservationsRepository.delete(id)
    return{
      status: 200,
      body: 'Reserva deletada com sucesso'
    }
  }
}
