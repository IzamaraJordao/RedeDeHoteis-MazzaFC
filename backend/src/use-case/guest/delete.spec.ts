import { describe, expect, it } from 'vitest'
import { Address } from '../../models/address/address'
import { GuestInMemory, Guest } from '../../models/guest'
import { DeleteGuest } from './delete'

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
  const sut = new DeleteGuest(repository)
  return { sut, repository, guest, data }
}

describe('Delete Guest', () => {
  it('Should delete an guest', async () => {
    const { sut, repository, guest } = makeSut()
    await sut.execute({
      params: { id: guest.id },
      body: undefined,
      query: undefined,
    })

    const result = async () => await repository.findById(guest.id)
    expect(result).rejects.toThrow()
  })
  it('Should throw if any guest not founded', async () => {
    const { sut, guest } = makeSut()
    expect(
      sut.execute({
        params: { id: 'new_id' },
        body: undefined,
        query: undefined,
      }),
    ).rejects.toThrow()
  })
})
