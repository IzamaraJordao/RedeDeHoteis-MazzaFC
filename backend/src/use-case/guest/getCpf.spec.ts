import { describe, expect, it } from "vitest";
import { Address } from "../../models/address/address";
import { Guest, GuestInMemory } from "../../models/guest";
import { GetGuestByCpf} from "./getCpf";

describe("Get by cpf use case", ()=>{ 
  it("Should throws if not valid cpf was provided", ()=>{
    const invalidCpf = "123.456.789-00";
    
    const guest = new Guest({
      name: 'any_name_Matheus',
      email: 'any_email',
      cpf: '999.999.999-99',
      rg: 'any_rg',
      phone: 'any_phone',
      address: new Address({
        street: 'any_street',
        number: 'any_number',
        complement: 'any_complement',
        neighborhood: 'any_neighborhood',
        city: 'any_city',
        state: 'any_state',
        zipCode: '14400000',
      }
      
      ),
    })

    const guestRepository = new GuestInMemory();
    guestRepository.data = [guest];
    const sut = new GetGuestByCpf(guestRepository);

    expect(async()=> await sut.execute({
      body: undefined,
      params: {cpf: invalidCpf},
      query: undefined,
    })).rejects.toThrow("CPF inválido");
  })


})


//
