import { UseCase } from './../interface';

import {
  BedroomRepository,
  Bedroom,
  BedroomConstructor,
} from '../../models/bedroom'
import { Request } from '../interface'
// import { Address } from '../../models/address';

export class UpdateBedroom implements UseCase<BedroomConstructor,undefined,undefined,string> {

  constructor(private readonly bedroomRepository: BedroomRepository) {}

  async execute(params: Request<BedroomConstructor>) {
    const {id} = params.params
    const bedroom = new Bedroom(params.body)
    console.log(id, bedroom)
    await this.bedroomRepository.update(id, bedroom)
    return {   
      status: 201,
      body:'Quarto alterado com sucesso'
    }
    }
  }
//
