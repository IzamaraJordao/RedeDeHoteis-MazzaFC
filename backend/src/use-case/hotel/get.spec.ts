import { GetHotel } from './get'
import { expect, it } from 'vitest'
import { Address } from '../../models/address/address'
import { HotelInMemory, Hotel } from '../../models/hotel'

function makeSut() {
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
      zipCode: '14400000',
    }),
    phone: 'any_phone',
    email: 'any_email',
  })
  const repository = new HotelInMemory()
  repository.data = [hotel]
  const sut = new GetHotel(repository)
  return { sut, repository, hotel }
}

it('should return an hotel', async () => {
  const { sut, hotel } = makeSut()
  const result = await sut.execute({
    params: { id: hotel.id },
    body: undefined,
    query: undefined,
  })
  expect(result).toBe(hotel)
})
it('should throw if hotel not found', async () => {
  const { sut } = makeSut()
  expect(
    sut.execute({
      params: { id: 'invalid_id' },
      body: undefined,
      query: undefined,
    }),
  ).rejects.toThrow()
})
