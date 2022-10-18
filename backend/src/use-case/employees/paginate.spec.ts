import { describe, expect, it } from 'vitest'
import { Address } from '../../models/address/address'
import { EmployeeInMemory, Employee } from '../../models/employees'
import { PaginateEmployee } from './paginate'

function makeSut() {
    const data = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        cpf: '999.999.999-99',
        rg: 'any_rg',
        phone: '(99) 99999-9999',
        password: 'any_password',
        hotel_id: 'any_hotel_id',
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
    // @ts-ignore
    repository._data = [employee]
    const sut = new PaginateEmployee(repository)
    return { sut, repository, employee, data }
    }
//criando o teste do filtro de funcionários
describe('Paginate Employee', () => {
    it('should return a list of employees', async () => {
        const { sut, repository, employee } = makeSut()
    //     const result = await sut.execute({
     
  
    // })
    })
})
