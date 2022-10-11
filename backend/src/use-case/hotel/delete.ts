import { HotelRepository } from '../../models/hotel'
import { Request } from '../interface'

export class DeleteHotel  {
  
  constructor(private readonly hotelRepository: HotelRepository) {}

  async execute(params: Request<undefined, { id: string }>) {
    const { id } = params.params

    await this.hotelRepository.delete(id)
    return{
      status: 200,
      body: 'Hotel deletado com sucesso'
    }
  }
}
