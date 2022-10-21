
//teste unitario para o caso de uso de criar um quarto
import { CreateBedroom } from './create'
import { BedroomInMemory, BedroomRepository } from '../../models/bedroom'
import { Bedroom } from '../../models/bedroom/bedroom'
import { describe, expect, it } from 'vitest'
import { Address } from '../../models/address/address'
import { Guest } from '../../models/guest/guest';


function makeSut() {
  const data = {
    guest: new Guest ({
      id: '1',
      name: 'any_name',
      cpf: '999.999.999-99',
      rg: 'any_rg',
      email: 'any_email',
      phone: 'any_phone',
      address: new Address({
        street: 'any_street',
        number: 'any_number',
        complement: 'any_complement',
        neighborhood: 'any_neighborhood',
        city: 'any_city',
        state: 'any_state',
        zipCode: '14400000',
      }),
    }),
    id: 'any_id',
    status: 'status',
    room_types: 'room_types',
    hotel_id: 'hotel_id',
    position_X: 'position_X',
    position_Y: 'position_Y',
  }
  const bedroom = new Bedroom(data)
  const repository = new BedroomInMemory()
  repository.data = [bedroom]
  const sut = new CreateBedroom(repository)
  return { sut, repository, bedroom, data }
}

describe('Create Bedroom', () => {
  it('Should create an bedroom', async () => {
    const { sut, repository, data } = makeSut()
    data.id = 'new_id'
    // @ts-ignore
    console.log(repository._data, data)
    // @ts-ignore
    await sut.execute({ params: undefined, body: data, query: undefined })
   
    const result = await repository.findById(data.id);
    expect(result).toBeDefined()
  });
  it('Should throw if id already exists', async () => {
    const { sut, data } = makeSut()
    expect(
      // @ts-ignore
      sut.execute({ params: undefined, body: data, query: undefined }),
    ).rejects.toThrow()
  });
})
