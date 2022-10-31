import { Bedroom, BedroomRepository } from '../../models/bedroom'
import { Request, UseCase } from '../interface'
import { ValidationError} from '../../exceptions/validationError'
import { DataToken } from '../../helpers/auth'

export class GetFloors implements UseCase<undefined, undefined,{
  hotel_id: string
  floor: string
} ,Bedroom["floor"][]> {

  private readonly bedroomRepository: BedroomRepository
  constructor(bedroomRepository: BedroomRepository) {
    this.bedroomRepository = bedroomRepository
  }
  async execute(params: Request<undefined, undefined,{ hotel_id: string}>, dataToken: DataToken) {
    let { hotel_id } = params.query
    if( !hotel_id){
      console.log(dataToken)
      hotel_id = dataToken.hotel_id
    }
    if(!hotel_id) throw new ValidationError('Hotel é obrigatório')
    const response = await this.bedroomRepository.getFloor(hotel_id)
    return {
      status: 200,
      body:response
    }
  }
}
    
    
  
