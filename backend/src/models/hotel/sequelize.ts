
import { Model, Optional } from 'sequelize';
import { Address } from '../address';




type HotelAttributes = {
  id?: string
  cnpj: number
  name: string
  address: Address
  phone: string
  email: string
  
};


type UserCreationAttributes = Optional<HotelAttributes, 'id'>;

class Hotel extends Model<HotelAttributes, UserCreationAttributes> {
 declare id?: string
 declare cnpj: number
 declare name: string
 declare  address: Address
 declare phone: string
 declare email: string
 
}