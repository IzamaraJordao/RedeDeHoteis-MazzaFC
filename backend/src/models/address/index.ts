import { Address } from './address'

export { Address } from './address'
export type { AddressConstructor } from './address'
export { AddressRepositorySequelize } from './sequelize'

export interface AddressRepository {
  save(address: Address): Promise<void>
  paginate(): Promise<Address[]>
  findById(id: string): Promise<Address>
  findByCep(cep: string): Promise< Address[]>
  delete(id: string): Promise<void>
  update(id: string, address: Address): Promise<void>
}

//
