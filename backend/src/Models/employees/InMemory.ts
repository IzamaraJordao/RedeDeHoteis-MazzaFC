import { DbError } from './../../exceptions/dbError';
import { EmployeeRepository } from ".";
import { Employee } from "./employee";


export class  EmployeeInMemory implements EmployeeRepository{
    private _data: Employee[] = [];

    constructor(){}
    save(employee: Employee): Promise<void> {
        throw new Error("Method not implemented.");
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
    findByEmail(email: string): Promise<Employee> {
        const employee = this._data.find((employee) => employee.email === email);
        if (employee){
            return Promise.resolve(employee);
        }else{
            return Promise.reject(new DbError('Empregado não encontrado',404));
        }
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    update(id: string, employee: Employee): Promise<void> {
        throw new Error("Method not implemented.");
    }

    set data(data: Employee[]){
        this._data = data;
    }
}
