import { HotelConstructor } from './../../models/hotel/hotel'
import { Hotel, HotelRepository } from '../../models/hotel'
import { Request, UseCase } from '../interface'

export class CreateHotel
  implements UseCase<HotelConstructor, undefined, undefined, string>
{
  constructor(private readonly hotelRepository: HotelRepository) {}
  async execute(params: Request<HotelConstructor>) {
    const hotel = new Hotel(params.body)
    const hotelFounded = await this.hotelRepository.findByCnpj(hotel.cnpj)
    if (hotelFounded) {
      throw new Error('CNPJ já cadastrado')
    }
    await this.hotelRepository.save(hotel)
    return {
      status: 201,
      body: 'Hotel criado com sucesso',
    }
  }
}
