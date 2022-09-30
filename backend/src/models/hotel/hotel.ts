import { Address } from '../address'
import { uuid } from '../../helpers/uuid'

export type HotelConstructor = {
  id?: string
  cnpj: string
  name: string
  address: Address
  phone: string
  email: string
}

export class Hotel {
  id: string
  cnpj: string
  name: string
  address: Address
  phone: string
  email: string

  constructor(props: HotelConstructor) {
    this.id = props.id || uuid()
    this.cnpj = props.cnpj
    this.name = props.name
    this.address = props.address
    this.phone = props.phone
    this.email = props.email
  }

  get loginInfo() {
    return {
      cnpj: this.cnpj,
      name: this.name,
      address: this.address,
      phone: this.phone,
      email: this.email,
    }
  }
  get publicInfo() {
    return {
      id: this.id,
      cnpj: this.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5'),
      name: this.name,
      address: this.address,
      phone: this.phone,
      email: this.email,
    }
  }


  get data(){
    return {
      id: this.id,
      cnpj: this.cnpj,
      name: this.name,
      address_id : this.address.id,
      phone: this.phone,
      email: this.email,
    }
  }

  static filter(){
    return ['id', 'cnpj', 'name', 'address_id', 'phone', 'email']
  }

}
