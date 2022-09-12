import { uuid } from '../../helpers/uuid'
import { Address } from '../address/address'
import { Hotel } from '../hotel'

export type EmployeeConstructor = {
  id?: string
  name: string
  rg: string
  cpf: string
  email: string
  phone: string
  address: Address
  note?: string
  active?: boolean
  password: string
  hotel?: string
  is_first_access?: boolean
}

export class Employee {
  id: string
  name: string
  rg: string
  cpf: string
  email: string
  phone: string
  address: Address
  note: string
  active: boolean
  password: string
  _hotel?: string
  is_first_access: boolean

  constructor(props: EmployeeConstructor) {
    this.id = props.id || uuid()
    this.name = props.name
    this.rg = props.rg
    this.cpf = props.cpf.replace(/\D/g, '')
    this.email = props.email
    this.phone = props.phone.replace(/\D/g, '')
    this.address = props.address
    this.note = props.note || ''
    this.active = props.active || true
    this.is_first_access = props.is_first_access || false
    this.password = props.password
    this._hotel = props.hotel || undefined
  }

  assignToHotel(hotel: Hotel['id']): void {
    this._hotel = hotel
  }
  get hotel() {
    return this._hotel
  }

  get loginInfo() {
    return {
      email: this.email,
      name: this.name,
    }
  }
}
