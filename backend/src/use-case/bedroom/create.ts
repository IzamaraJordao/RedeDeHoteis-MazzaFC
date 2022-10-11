
import { HttpError } from '../../exceptions/httpError'
import { UseCase } from '../interface';
import {DataToken} from '../../helpers/auth'
import {
  BedroomRepository,
  Bedroom,
  BedroomConstructor,
  
} from '../../models/bedroom';
import { Request } from '../interface'

export class CreateBedroom implements UseCase<BedroomConstructor,undefined,undefined,string> {
  hotelRepository: any;
  constructor(private readonly bedroomRepository: BedroomRepository) {}
  async execute(params: Request<BedroomConstructor>, token: DataToken) {
    const bedroom = new Bedroom(params.body)
    const hotel =  await this.hotelRepository.findById(token.id_hotel)
    if(!hotel){ throw new HttpError('Hotel não encontrado',404)}
    if(!hotel.blocked){await this.hotelRepository.update({blocked: true},token.id_hotel)}
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

