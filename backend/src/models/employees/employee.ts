import { uuid } from '../../helpers/uuid'
import { Address } from '../address/address'

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
  hotel_id: string
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
  hotel_id: string
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
    this.hotel_id = props.hotel_id
  }



  get loginInfo() {
    return {
      email: this.email,
      name: this.name,
    }
  }
  get publicInfo() {
    return {
      id: this.id,
      name: this.name,
      rg: this.rg,
      cpf: this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
      email: this.email,
      phone: this.phone.replace(/(\d{2})(\d{4|5})(\d{4})/, "($1) $2-$3"),
      address: this.address,
      note: this.note,
      active: this.active,
      is_first_access: this.is_first_access,
      hotel: this.hotel_id
    }
  }
  /**
   * Retorna todos os parametros em formato json
   */
  get data() {
    return {
      id: this.id,
      name: this.name,
      rg: this.rg,
      cpf: this.cpf,
      email: this.email,
      phone: this.phone,
      note: this.note,
      active: this.active,
      is_first_access: this.is_first_access,
      password: this.password,
      hotel_id: this.hotel_id,
      address_id: this.address.id
    }
  }

  static filter() {
    return ['id', 'name', 'email', 'cpf', 'rg', 'phone', 'hotel', 'active']
  }

}
