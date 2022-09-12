import { Employee } from "./employee";

export { Employee } from "./employee";
export {EmployeeInMemory} from "./InMemory";
export type { EmployeeConstructor } from "./employee";

export interface EmployeeRepository {
    save(employee: Employee): Promise<void>;
    paginate(): Promise<Employee[]>;
    findById(id: string): Promise<Employee>;
    findByEmail(email: string): Promise<Employee>;
    delete(id: string): Promise<void>;
    update(id: string, employee: Employee): Promise<void>;
    
}