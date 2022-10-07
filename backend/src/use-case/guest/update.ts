import { UseCase } from './../interface';

import {
  GuestRepository,
  Guest,
  GuestConstructor,
} from '../../models/guest'
import { Request } from '../interface'
// import { Address } from '../../models/address';

export class UpdateGuest implements UseCase<GuestConstructor,undefined,undefined,string> {

  constructor(private readonly guestRepository: GuestRepository) {}

  async execute(params: Request<GuestConstructor>) {
    // const address = new Address(params.body.address)
    // params.body.address = address
    const {id} = params.params
    const guest = new Guest(params.body)

    await this.guestRepository.update(id, guest)
    return {  
      status: 201,
      body:'Hóspede alterado com sucesso'
    }
    }
  }
//
