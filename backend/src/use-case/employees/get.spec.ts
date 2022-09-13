import { expect, it } from 'vitest'
import { Address } from '../../models/address/address'
import { EmployeeInMemory, Employee } from '../../models/employees'
import { GetEmployee } from './get'

function makeSut() {
  const employee = new Employee({
    name: 'any_name',
    email: 'any_email',
    cpf: '999.999.999-99',
    rg: 'any_rg',
    password: 'any_password',
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
  const repository = new EmployeeInMemory()
  repository.data = [employee]
  const sut = new GetEmployee(repository)
  return { sut, repository, employee }
}

it('should return an employee', async () => {
  const { sut, employee } = makeSut()
  const result = await sut.execute({
    params: { id: employee.id },
    body: undefined,
    query: undefined,
  })
  expect(result.body).toStrictEqual(employee.publicInfo)
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
