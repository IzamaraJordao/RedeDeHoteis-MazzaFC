import { HotelInMemory } from "../../Models/hotel";
import { Hotel } from "../../Models/hotel";
import { HotelConstructor } from "../../Models/hotel/hotel";
import { CreateHotel } from "./create";
import { expect, it, describe } from 'vitest';
import { Address } from "../../models/address/address";

function makeSut(){
    const hotel = new Hotel({
        cnpj: 123456789,
        name: 'any_name',
        address: new Address({
            street: 'any_street',
            number: 'any_number',
            complement: 'any_complement',
            neighborhood: 'any_neighborhood',
            city: 'any_city',
            state: 'any_state',
            zipCode: '14400000'
        }),
        phone: 'any_phone',
        email: 'any_email',
    });
    const repository = new HotelInMemory();
    const sut = new CreateHotel(repository);
    return {sut,repository,hotel};
}

describe('Create Hotel',()=>{
    it ('Should create an hotel', async () => {
        const {sut,repository,hotel} = makeSut();
        await sut.execute({params: undefined, body: hotel, query: undefined});
        const result = await repository.findById(hotel.id);
        expect(result).toBeDefined();
    })
    it ('Should throw if hotel already exists', async () => {
        const {sut,hotel} = makeSut();
        expect(sut.execute({params: undefined, body: hotel, query: undefined})).rejects.toThrow();
    })
    
})
