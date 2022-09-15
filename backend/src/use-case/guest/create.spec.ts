import { describe, expect, it } from 'vitest'
import { Address } from '../../models/address/address'
import { GuestInMemory, Guest } from '../../models/guest'
import { CreateGuest } from './create'

function makeSut() {
  const data = {
    id: 'any_id',
    name: 'any_name',
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
    }),
  }
  const guest = new Guest(data)
  const repository = new GuestInMemory()
  repository.data = [guest]
  const sut = new CreateGuest(repository)
  return { sut, repository, guest ,data }
}

describe('Create Guest', () => {
  it('Should create an guest', async () => {
    const { sut, repository, data } = makeSut()
    data.cpf = 'new_cpf'
    data.id = 'new_id'
    await sut.execute({ params: undefined, body: data, query: undefined })

    const result = await repository.findById(data.id)
    expect(result).toBeDefined()
  })
  it('Should throw if cpf already exists', async () => {
    const { sut, data } = makeSut()
    expect(
      sut.execute({ params: undefined, body: data, query: undefined }),
    ).rejects.toThrow()
  })
})
