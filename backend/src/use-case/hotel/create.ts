import { HotelConstructor } from './../../Models/hotel/hotel';
import { Hotel, HotelRepository } from "../../Models/hotel";
import { Request } from "../interface";

export class CreateHotel {
    constructor(private readonly hotelRepository: HotelRepository) {}
    async execute(params: Request<HotelConstructor>) {
        const hotel = new Hotel(params.body)
        const hotelFounded = await this.hotelRepository.findByCnpj(hotel.cnpj)
        if(hotelFounded){
            throw new Error('CNPJ já cadastrado')
        }
        await this.hotelRepository.save(hotel)
    }
}