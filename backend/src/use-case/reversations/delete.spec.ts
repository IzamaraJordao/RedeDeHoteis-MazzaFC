import { describe, expect, it } from 'vitest'
import { Address } from '../../models/address/address'
import { EmployeeInMemory, Employee } from '../../models/employees'
import { DeleteEmployee } from './delete'

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
  const employee = new Employee(data)
  const repository = new EmployeeInMemory()
  repository.data = [employee]
  const sut = new DeleteEmployee(repository)
  return { sut, repository, employee, data }
}

describe('Delete Employee', () => {
  it('Should delete an employee', async () => {
    const { sut, repository, employee } = makeSut()
    await sut.execute({
      params: { id: employee.id },
      body: undefined,
      query: undefined,
    })

    const result = async () => await repository.findById(employee.id)
    expect(result).rejects.toThrow()
  })
  it('Should throw if any employee not founded', async () => {
    const { sut, employee } = makeSut()
    expect(
      sut.execute({
        params: { id: 'new_id' },
        body: undefined,
        query: undefined,
      }),
    ).rejects.toThrow()
  })
})
