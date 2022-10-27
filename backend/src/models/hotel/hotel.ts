import { Address } from '../address'
import { uuid } from '../../helpers/uuid'

export type HotelConstructor = {
  id?: string
  cnpj: string
  name: string
  address: Address
  phone: string
  email: string
  floor_hotel: number
  
}

export class Hotel {
  id: string
  cnpj: string
  name: string
  address: Address
  phone: string
  email: string
  floor_hotel: number

  constructor(props: HotelConstructor) {
    this.id = props.id || uuid()
    this.cnpj = props.cnpj
    this.name = props.name
    this.address = props.address
    this.phone = props.phone
    this.email = props.email
    this.floor_hotel = props.floor_hotel
  }

  get loginInfo() {
    return {
      cnpj: this.cnpj,
      name: this.name,
      address: this.address,
      phone: this.phone,
      email: this.email,
      floor_hotel: this.floor_hotel

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
      floor_hotel: this.floor_hotel
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
      floor_hotel: this.floor_hotel
    }
  }

  static filter(){
    return ['id', 'cnpj', 'name', 'address_id', 'phone', 'email', 'floor_hotel']
  }

}
