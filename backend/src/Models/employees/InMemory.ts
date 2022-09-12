import { DbError } from './../../exceptions/dbError';
import { EmployeeRepository } from ".";
import { Employee } from "./employee";


export class  EmployeeInMemory implements EmployeeRepository{
    private _data: Employee[] = [];

    constructor(){}
    save(employee: Employee): Promise<void> {
        const employeeToSave = new Employee(employee);
        this._data.push(employeeToSave);
        return Promise.resolve();
    }
    paginate(): Promise<Employee[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Employee> {
        const employee = this._data.find((employee) => employee.id === id);
        if (employee){
            return Promise.resolve(employee);
        }else{
            return Promise.reject(new DbError('Empregado não encontrado',404));
        }
    }
    findByEmail(email: string): Promise<Employee | undefined> {
        const employee = this._data.find((employee) => employee.email === email);
        if (employee){
            return Promise.resolve(employee);
        }
        return Promise.resolve(undefined);
    }
    delete(id: string): Promise<void> {
        const index = this._data.findIndex((employee) => employee.id === id);
        if (index !== -1){
            this._data.splice(index,1);
            return Promise.resolve();
        }else{
            return Promise.reject(new DbError('Empregado não encontrado',404));
        }
    }
    update(id: string, employee: Employee): Promise<void> {
        throw new Error("Method not implemented.");
    }

    set data(data: Employee[]){
        this._data = data;
    }
}
