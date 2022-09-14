
import { Model, Optional } from 'sequelize';
import { Address } from '../address';




type AddressAttributes = {
  id?: string
  cnpj: number
  name: string
  address: Address
  phone: string
  email: string
  
};


type UserCreationAttributes = Optional<AddressAttributes, 'id'>;

class address extends Model<AddressAttributes, UserCreationAttributes> {
 declare id?: string
 declare cnpj: number
 declare name: string
 declare  address: Address
 declare phone: string
 declare email: string
 
}