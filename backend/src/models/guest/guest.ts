import { uuid } from '../../helpers/uuid'
import { Address } from '../address/address'


export type GuestConstructor = {
  id?: string
  name: string
  cpf: string
  rg: string
  email: string
  phone: string
  address: Address
}


export class Guest {
  id: string
  name: string
  cpf: string
  rg: string
  email: string
  phone: string
  address: Address

  constructor(props: GuestConstructor) {
    this.id = props.id || uuid()
    this.name = props.name
    this.rg = props.rg
    this.cpf = props.cpf.replace(/\D/g, '')
    this.email = props.email
    this.phone = props.phone.replace(/\D/g, '')
    this.address = props.address

  }

  get publicInfo(){
    return{
      id : this.id ,
      name : this.name,
      cpf : this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
      rg : this.rg,
      email : this.email,
      phone : this.phone.replace(/(\d{2})(\d{4|5})(\d{4})/, "($1) $2-$3"),
      address : this.address,

    }
  }
}
