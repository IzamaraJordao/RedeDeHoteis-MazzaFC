import { Address } from '../address'
import { uuid } from '../../helpers/uuid'

export type HotelConstructor = {
  id?: string
  cnpj: number
  name: string
  address: Address
  phone: string
  email: string
}

export class Hotel {
  id: string
  cnpj: number
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
}
