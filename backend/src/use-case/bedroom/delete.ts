
import { BedroomRepository } from '../../models/bedroom';
import { Request } from '../interface'

export class DeleteBedroom {
  constructor(private readonly bedroomRepository: BedroomRepository) {}
  async execute(params: Request<undefined, { id: string }>) {
    const { id } = params.params

    await this.bedroomRepository.delete(id)
  }
}
