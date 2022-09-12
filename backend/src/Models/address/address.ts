import { uuid } from "../../helpers/uuid";

export type AddressConstructor = {
    id?: string ;
    street: string;
     number: string;
     complement: string;
     neighborhood: string;
     city: string;
     state: string;
     zipCode: string

}

export class Address {
    id: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    

    constructor(props: AddressConstructor){
        this.id = props.id || uuid();
        this.street = props.street;
        this.number = props.number;
        this.complement = props.complement;
        this.neighborhood = props.neighborhood;
        this.city = props.city;
        this.state = props.state;
        this.zipCode = props.zipCode.replace(/\D/g, "") ;
        
    }

}