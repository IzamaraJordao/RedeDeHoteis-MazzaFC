
import { describe, expect, it } from 'vitest'
import { Address } from '../../models/address/address'
import { EmployeeInMemory, Employee } from '../../models/employees'
import { UpdateEmployee } from './update'

function makeSut() {
    const data = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        cpf: '999.999.999-99',
        rg: 'any_rg',
        phone: 'any_phone',
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
    repository.data = [employee]
    const sut = new UpdateEmployee(repository)
    return { sut, repository, employee, data }
    }

describe('Update Employee', () => {
    it('Should update an employee', async () => {
        const { sut, repository, employee, data } = makeSut()
        const result = await sut.execute({
        params: { id: employee.id },
        body: {
            name: 'new_name',
            email: 'new_email',
            cpf: '888.888.888-88',
            rg: 'new_rg',
            phone: 'new_phone',
            password: 'new_password',
            hotel_id: 'new_hotel_id',
            address: new Address({
            street: 'new_street',
            number: 'new_number',
            complement: 'new_complement',
            neighborhood: 'new_neighborhood',
            city: 'new_city',
            state: 'new_state',
            zipCode: '14400000',
            }),
        },
        query: undefined,
        })
        expect(result.status).toBe(201)
        expect(result.body).toBe('Funcionario alterado com sucesso')
        const employeeUpdated = await repository.findById(employee.id)
        expect(employeeUpdated).toEqual({
        ...data,
        name: 'new_name',
        email: 'new_email',
        cpf: '888.888.888-88',
        rg: 'new_rg',
        phone: 'new_phone',
        address: new Address({
            street: 'new_street',
            number: 'new_number',
            complement: 'new_complement',
            neighborhood: 'new_neighborhood',
            city: 'new_city',
            state: 'new_state',
            zipCode: '14400000',
        }),
        })
    })
    it('Should throw if any employee not founded', async () => {
        const { sut, employee } = makeSut()
        expect(
        sut.execute({
            params: { id: 'new_id' },
            body: employee,
            query: undefined,
        }),
        ).rejects.toThrow()
    })
})

