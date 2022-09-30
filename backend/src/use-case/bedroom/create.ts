import { HttpError } from '../../exceptions/httpError'
import { UseCase } from '../interface';

import {
  BedroomRepository,
  Bedroom,
  BedroomConstructor,
} from '../../models/bedroom';
import { Request } from '../interface'

export class CreateBedroom implements UseCase<BedroomConstructor,undefined,undefined,string> {
  constructor(private readonly bedroomRepository: BedroomRepository) {}
  async execute(params: Request<BedroomConstructor>) {
    const bedroom = new Bedroom(params.body)
    const bedroomFounded = await this.bedroomRepository.findByroom_types(
      bedroom.room_types,
    )
    if (bedroomFounded) {
      throw new HttpError('Tipo já cadastrado', 400)
    }
  
    await this.bedroomRepository.save(bedroom)
    return {  
      status: 201,
      body:'Quarto criado com sucesso'
    }

    }
  }

