import { uuid } from "../../helpers/uuid";

export type AddressConstructor = {
    id?: string ;
    street: string;
     number: string;
     complement: string;
     neighborhood: string;
     city: string;
     state: string;
     zipCode?: string
     zip_code?: string
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
        this.zipCode = props.zipCode || props.zip_code as string;
        this.zipCode = this.zipCode.replace(/\D/g, "") ;
        
    }

    get data(){
      return {
        id: this.id,
        street: this.street,
        number: this.number,
        complement: this.complement,
        neighborhood: this.neighborhood,
        city: this.city,
        state: this.state,
        zipCode: this.zipCode,
      }
    }

    
}
