import { Hotel, HotelRepository } from '../../models/hotel'
import { Request, UseCase } from '../interface'

export class GetHotel implements UseCase<undefined, { id: string }, undefined, Hotel> {

  constructor(private readonly hotelRepository: HotelRepository) {}
  async execute(params: Request<undefined, { id: string }>) {
    const { id } = params.params
    const hotel = await this.hotelRepository.findById(id)
    return {
      status: 200,
      body: hotel
    }
  }
}
