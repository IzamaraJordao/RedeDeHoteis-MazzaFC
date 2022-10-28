import { HttpError } from '../../exceptions/httpError'
import { UseCase } from './../interface';

import {
  GuestRepository,
  Guest,
  GuestConstructor,
} from '../../models/guest'
import { Request } from '../interface'
import { Address } from '../../models/address';

export class CreateGuest implements UseCase<GuestConstructor,undefined,undefined,string> {
  constructor(private readonly guestRepository: GuestRepository) {}
  async execute(params: Request<GuestConstructor>) {
    const address = new Address(params.body.address)
    params.body.address = address
    console.log(address.id)
    const guest = new Guest(params.body)
    console.log(guest)
    const guestFounded = await this.guestRepository.findByCpf(
      guest.cpf,
    )
    if (guestFounded) {
      throw new HttpError('Cpf já cadastrado', 400)
    }
  
    await this.guestRepository.save(guest)
    return {  
      status: 200,
      body:'Cliente criado com sucesso'
    }
    }
  }

