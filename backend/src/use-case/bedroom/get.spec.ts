
import { Props } from './../../../../frontend/src/common/components/Input/types';
import { expect, it } from 'vitest'
import { Address } from '../../models/address/address'
import { Bedroom, BedroomInMemory } from '../../models/bedroom'
import { BedroomRepository } from '../../models/bedroom'


function makeSut() {
  const bedroom = {
    id: 'any_id',
    status: 'any_status',
    tipo: 'any_tipo',
    guest_id: {
      id: 'any_id',
      name: 'any_name',
      rg: 'any_rg',
      cpf: 'any_cpf',
      email: 'any_email',
      phone:  'any_phone',
      address: 'any_address',
      note: 'any_note',
      active: 'any_active',
      password: 'any_password',
      hotel_id: 'any_hotel_id',
      is_first_access: 'any_is_first_access',
  }
  }
  
  const repository = new BedroomInMemory()
  repository.data = [bedroom]
  const sut = new GetBedroom(repository)
  return { sut, repository, bedroom }
}

it('should return an Bedroom', async () => {
  const { sut, bedroom } = makeSut()
  const result = await sut.execute({
    params: { id: bedroom.id },
    body: undefined,
    query: undefined,
  })
  expect(result.body).toStrictEqual(bedroom.publicInfo)
  //@ts-ignore
  expect(result.status).toBe(200)
})
it('should throw if bedroom not found', async () => {
  const { sut } = makeSut()
  expect(
    sut.execute({
      params: { id: 'invalid_id' },
      body: undefined,
      query: undefined,
    }),
  ).rejects.toThrow()
})
