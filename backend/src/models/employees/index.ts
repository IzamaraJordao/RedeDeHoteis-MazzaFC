import { Employee } from "./employee";
import { EmployeeRepositorySequelize } from "./sequelize";

export { Employee } from "./employee";
export {EmployeeInMemory} from "./InMemory";
export type { EmployeeConstructor } from "./employee";
export { EmployeeRepositorySequelize } from "./sequelize";

export type PaginateParams = {
  page: number;
  pageSize: number;
  filter:{
    [key:string] :string | number | boolean
  }
}

export interface EmployeeRepository {
    save(employee: Employee): Promise<void>;
    paginate(params: PaginateParams): Promise<Employee[] | number>;
    findById(id: string): Promise<Employee>;
    findByEmail(email: string): Promise<Employee| undefined>;
    delete(id: string): Promise<void>;
    update(id: string, employee: Employee): Promise<void>;
}

export const employeeRepository =  new EmployeeRepositorySequelize()


