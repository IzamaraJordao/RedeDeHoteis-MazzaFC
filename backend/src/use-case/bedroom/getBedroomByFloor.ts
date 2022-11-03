import { Bedroom, BedroomRepository } from '../../models/bedroom'
import { Request, UseCase } from '../interface'
import { ValidationError} from '../../exceptions/validationError'
import { DataToken } from '../../helpers/auth'

export class GetBedroomByFloor implements UseCase<undefined, undefined,{
  hotel_id: string
  floor: string
} ,Bedroom["publicInfo"][]> {

  private readonly bedroomRepository: BedroomRepository
  constructor(bedroomRepository: BedroomRepository) {
    this.bedroomRepository = bedroomRepository
  }
  async execute(params: Request<undefined, undefined,{ hotel_id: string, floor: string }>, dataToken: DataToken) {
    let { hotel_id, floor } = params.query
    if( !hotel_id){
      hotel_id = dataToken.hotel_id
    }
    if(!hotel_id || !floor) throw new ValidationError('Hotel e andar são obrigatórios')
    const response = await this.bedroomRepository.getBedrooms(hotel_id, floor)
    console.log(response)
    return {
      status: 200,
      body: [
        ...response.map((bedroom) => bedroom.publicInfo)
      ]
    }
  }
}
    
    
  
