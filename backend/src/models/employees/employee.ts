import { ValidationError } from '../../exceptions/validationError'
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

  constructor(props: EmployeeConstructor, isCreating = false) {
    this.id = props.id || uuid()
    if(!props.name){
      throw new ValidationError('Nome não informado')
    }
      this.name =  props.name
    if(!props.rg){
      throw new ValidationError('RG não informado')
    }
    this.rg = props.rg
    if(!props.cpf){
      throw new ValidationError('CPF não informado')
    }
    this.cpf = props.cpf.replace(/\D/g, '')
    if(!props.email){
      throw new ValidationError('Email não informado')
    }
    this.email = props.email
    if(!props.phone){
      throw new ValidationError('Telefone não informado')
    }
    this.phone = props.phone.replace(/\D/g, '')

    if(!props.address){
      throw new ValidationError('Endereço não informado')
    }
    this.address = props.address
   
    this.note = props.note || ''
    
    this.active = props.active || true
   
    this.is_first_access = props.is_first_access || false
    if(!props.password && isCreating){
      throw new ValidationError('Senha não informada')
    }
    this.password = props.password 

    if(!props.hotel_id){
      throw new ValidationError('Hotel não informado')
    }
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
      hotel_id: this.hotel_id,
    }
  }
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

  static filter(): Array<keyof Employee> {
    return ['id', 'name', 'email', 'cpf', 'rg', 'phone', 'hotel_id', 'active']
  }

}
