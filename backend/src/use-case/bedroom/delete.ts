
import { BedroomRepository } from '../../models/bedroom'
import { Request, UseCase } from '../interface'

export class DeleteBedroom implements UseCase<undefined,{id: string},undefined,string> {
  constructor(private readonly bedroomRepository: BedroomRepository) {}
  async execute(params: Request<undefined, { id: string }>) {
    const { id } = params.params

    await this.bedroomRepository.delete(id)
    return{
      status: 200,
      body: 'Quarto deletado com sucesso'
    }
  }
}