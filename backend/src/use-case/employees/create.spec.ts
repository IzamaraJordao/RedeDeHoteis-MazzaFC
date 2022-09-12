
import {describe, expect, it} from 'vitest';
import { Address } from '../../models/address/address';
import {EmployeeInMemory,Employee} from '../../Models/employees';
import {CreateEmployee} from './create';

function makeSut(){
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
        zipCode: '14400000'}
    )};
    const employee = new Employee(data);
    const repository = new EmployeeInMemory();
    repository.data = [employee];
    const sut = new CreateEmployee(repository);
    return {sut,repository,employee,data};

}

describe('Create Employee',()=>{
    it ('Should create an employee', async () => {
        const {sut,repository,data} = makeSut();
        data.email = 'new_email';
        data.id = 'new_id';
        await sut.execute({params: undefined, body: data, query: undefined});
        
        const result = await repository.findById(data.id);
        expect(result).toBeDefined();
    })
    it ('Should throw if email already exists', async () => {
        const {sut,data} = makeSut();
        expect(sut.execute({params: undefined, body: data, query: undefined})).rejects.toThrow();
    })
    
})


