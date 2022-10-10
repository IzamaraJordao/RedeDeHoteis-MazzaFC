import { UseCase } from './../interface';

import {
  HotelRepository,
  Hotel,
  HotelConstructor,
} from '../../models/hotel'
import { Request } from '../interface'
// import { Address } from '../../models/address';

export class UpdateHotel implements UseCase<HotelConstructor,undefined,undefined,string> {

  constructor(private readonly hotelRepository: HotelRepository) {}

  async execute(params: Request<HotelConstructor>) {
    // const address = new Address(params.body.address)
    // params.body.address = address
    const {id} = params.params
    const hotel = new Hotel(params.body)

    await this.hotelRepository.update(id, hotel)
    return {  
      status: 201,
      body:'Hotel alterado com sucesso'
    }
    }
  }
//
