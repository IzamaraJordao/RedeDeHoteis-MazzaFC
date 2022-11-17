import { Bedroom,BedroomRepository } from "../../models/bedroom";
import { Request,UseCase } from "../interface";


export class GetBedroom implements UseCase<undefined, { id: string }, undefined, Bedroom["publicInfo"]>{
    private readonly bedroomRepository: BedroomRepository
    constructor(bedroomRepository: BedroomRepository) {
        this.bedroomRepository = bedroomRepository
    }
    async execute(params: Request<undefined, { id: string }>) {
        const { id } = params.params
        console.log(params.params)
        const bedroom = await this.bedroomRepository.findById(id)
        return {
            result: bedroom.publicInfo,
            status: 200,
            body: bedroom.publicInfo,
        }
    }
}
