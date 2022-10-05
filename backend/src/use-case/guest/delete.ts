import { GuestRepository } from '../../models/guest'
import { Request } from '../interface'

export class DeleteGuest  {
  
  constructor(private readonly guestRepository: GuestRepository) {}

  async execute(params: Request<undefined, { id: string }>) {
    const { id } = params.params

    await this.guestRepository.delete(id)
    return{
      status: 200,
      body: 'Hóspede deletado com sucesso'
    }
  }
}
