import { Address } from "../address/address";
import { uuid } from "../../helpers/uuid";

export type EmployeeConstructor = {
    id?: string;
    name: string;
    rg: string;
    cpf: string;
    email: string;
    phone: string;
    address: Address;
    note?: string;
    active?: boolean;

}

export class Employee{
    
    id: string;
    name: string;
    rg: string;
    cpf: string;
    email: string;
    phone: string;
    address: Address;
    note: string;
    active: boolean;


    constructor(props: EmployeeConstructor){
        this.id = props.id || uuid();
        this.name = props.name;
        this.rg = props.rg;
        this.cpf = props.cpf.replace(/\D/g, "");
        this.email = props.email;
        this.phone = props.phone.replace(/\D/g, "");
        this.address = props.address;
        this.note = props.note || "";
        this.active = props.active || true;
    }
 
   

    
}