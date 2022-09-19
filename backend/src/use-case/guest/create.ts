import { HttpError } from '../../exceptions/httpError'
import { UseCase } from './../interface';

import {
  GuestRepository,
  Guest,
  GuestConstructor,
} from '../../models/guest'
import { Request } from '../interface'

export class CreateGuest implements UseCase<GuestConstructor,undefined,undefined,string> {
  constructor(private readonly guestRepository: GuestRepository) {}
  async execute(params: Request<GuestConstructor>) {
    const guest = new Guest(params.body)
    const guestFounded = await this.guestRepository.findByCpf(
      guest.cpf,
    )
    if (guestFounded) {
      throw new HttpError('Cpf já cadastrado', 400)
    }
  
    await this.guestRepository.save(guest)
    return {  
      status: 201,
      body:'Cliente criado com sucesso'
    }

    }
  }

