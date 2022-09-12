import { HotelRepository } from '../../Models/hotel'
import { Request } from '../interface'

export class GetHotel {
  constructor(private readonly hotelRepository: HotelRepository) {}
  async execute(params: Request<undefined, { id: string }>) {
    const { id } = params.params
    const hotel = await this.hotelRepository.findById(id)
    return hotel
  }
}
