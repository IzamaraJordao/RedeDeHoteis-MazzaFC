import { HotelConstructor } from './../../models/hotel/hotel'
import { Hotel, HotelRepository } from '../../models/hotel'
import { Request, UseCase } from '../interface'
import { Address } from '../../models/address'
import { Bedroom, BedroomRepository } from '../../models/bedroom'

export type FloorsType = {
  floors: {
    floor: string
    units: string
  }[]
}

export class CreateHotel
  implements
    UseCase<HotelConstructor & FloorsType, undefined, undefined, string>
{
  constructor(
    private readonly hotelRepository: HotelRepository,
    private readonly bedroomRepository: BedroomRepository,
  ) {}
  async execute(params: Request<HotelConstructor & FloorsType>) {
    const address = new Address(params.body.address) /// pegando o objeto inteiro do addres e colocand
    params.body.address = address // troco o .body.address pela class Address
    const hotel = new Hotel(params.body)
    const floor = Number(hotel.floor) /// number
    const floors = params.body.floors

    const hotelFounded = await this.hotelRepository.findByCnpj(hotel.cnpj)
    if (hotelFounded) {
      throw new Error('CNPJ já cadastrado')
    } 
    await this.hotelRepository.save(hotel)

    let bedrooms = []
    for (let i = 0; i < floor; i++) {
      
      const maxbedroom = Number(floors[i].units ) 
      for (let j = 0; j < maxbedroom; j++) {
        bedrooms.push(new Bedroom({
          
          // floor: hotel.floor,
          floor: hotel.floor,
          hotel_id: hotel.id,
        }))
      }
    }
    await this.bedroomRepository.saveMany(bedrooms)

    return {
      status: 201,
      body: 'Hotel criado com sucesso',
    }
  }
}
