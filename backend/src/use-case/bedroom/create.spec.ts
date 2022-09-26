import { describe, expect, it } from 'vitest'
import { BedroomInMemory, Bedroom } from '../../models/bedroom'
import { CreateBedroom } from './create'

function makeSut() {
  const data = {
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

    },
   
  }
  const bedroom = new Bedroom(data)
  const repository = new BedroomInMemory()
  repository.data = [bedroom]
  const sut = new CreateBedroom(repository)
  return { sut, repository, bedroom ,data }
}

describe('Create Bedroom', () => {
  it('Should create an bedroom', async () => {
    const { sut, repository, data } = makeSut()
    data.tipo = 'new_tipo'
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
