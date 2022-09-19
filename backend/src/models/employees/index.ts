import { Address } from "../address";
import { Employee } from "./employee";
import { EmployeeInMemory } from "./InMemory";

export { Employee } from "./employee";
export {EmployeeInMemory} from "./InMemory";
export type { EmployeeConstructor } from "./employee";
export type PaginateParams = {
  page: number;
  pageSize: number;
  filter:{
    [key:string] :string | number | boolean
  }

}
  export interface EmployeeRepository {
    save(employee: Employee): Promise<void>;
    paginate(params:PaginateParams): Promise<Employee[]>;
    findById(id: string): Promise<Employee>;
    findByEmail(email: string): Promise<Employee| undefined>;
    delete(id: string): Promise<void>;
    update(id: string, employee: Employee): Promise<void>;
}

export const employeeRepository = new EmployeeInMemory();

const employee = new Employee({
  id : "1",
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

employeeRepository.data = [employee]

//
