
import { Model, Optional } from 'sequelize';
import { Address } from '../address';




type EmployeeAttributes = {
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
  
};


type UserCreationAttributes = Optional<EmployeeAttributes, 'id'>;

class Employee extends Model<EmployeeAttributes, UserCreationAttributes> {
   declare id?: string
   declare name: string
   declare rg: string
   declare cpf: string
   declare email: string
   declare phone: string
   declare address: Address
   declare note?: string
   declare active?: boolean
   declare  password: string
   declare hotel?: string
   declare is_first_access?: boolean
}
