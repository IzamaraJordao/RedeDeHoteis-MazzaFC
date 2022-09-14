import { HttpError } from '../../exceptions/httpError'
import { Guest, GuestRepository } from '../../models/guest'
import { Request, UseCase } from '../interface'
import { cpfValidator} from '../../helpers/cpfValidator'
import { HTTP_STATUS } from '../../helpers/httpStatus'

type Body = undefined
type Params = { cpf: string }
type Query = undefined

export class GetGuestByCpf implements UseCase <Body, Params, Query , Guest["publicInfo"] >{
  private readonly guestRepository : GuestRepository
  constructor( guestRepository: GuestRepository) {
    this.guestRepository = guestRepository
  }
  async execute(params: Request<Body, Params>) {
    const { cpf } = params.params
    if(!cpfValidator(cpf)){
      throw new HttpError('CPF inválido', HTTP_STATUS.BAD_REQUEST)
    }
    const guest = await this.guestRepository.findByCpf(cpf)
    if(!guest){
      throw new HttpError('Hospede não encontrado', 404)
    }
    return {
      status: 200,
      body: guest.publicInfo,
    }
  }
}


