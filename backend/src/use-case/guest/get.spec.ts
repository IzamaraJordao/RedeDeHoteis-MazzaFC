import { expect, it } from 'vitest'
import { Address } from '../../models/address/address'
import { GuestInMemory, Guest } from '../../models/guest'
import { GetGuest } from './get'

function makeSut() {
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
  const repository = new GuestInMemory()
  repository.data = [guest]
  const sut = new GetGuest(repository)
  return { sut, repository, guest }
}

it('should return an employee', async () => {
  const { sut, guest } = makeSut()
  const result = await sut.execute({
    params: { id: guest.id },
    body: undefined,
    query: undefined,
  })
  expect(result.body).toStrictEqual(guest.publicInfo)
  //@ts-ignore
  expect(result.body.password).toBeUndefined()
})
it('should throw if employee not found', async () => {
  const { sut } = makeSut()
  expect(
    sut.execute({
      params: { id: 'invalid_id' },
      body: undefined,
      query: undefined,
    }),
  ).rejects.toThrow()
})
