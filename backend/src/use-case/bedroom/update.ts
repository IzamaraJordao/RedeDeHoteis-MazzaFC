import { UseCase } from './../interface';

import {
  BedroomRepository,
  Bedroom,
  BedroomConstructor,
} from '../../models/bedroom'
import { Request } from '../interface'

export class UpdateBedroom implements UseCase<BedroomConstructor,undefined,undefined,string> {

  constructor(private readonly bedroomRepository: BedroomRepository) {}

  async execute(params: Request<BedroomConstructor>) {
    const {id} = params.params
    console.log(params.body)
    const bedroom = new Bedroom(params.body)
    console.log(bedroom)
    
    await this.bedroomRepository.update(id, bedroom)
    return {   
      status: 200,
      body:'Quarto alterado com sucesso'
    }
    }
  }
//
