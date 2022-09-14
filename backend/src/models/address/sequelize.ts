
import { Model, Optional } from 'sequelize';




type AddressAttributes = {
    id?: string ;
    street: string;
     number: string;
     complement: string;
     neighborhood: string;
     city: string;
     state: string;
     zipCode: string
  
};


type UserCreationAttributes = Optional<AddressAttributes, 'id'>;

class address extends Model<AddressAttributes, UserCreationAttributes> {
  declare id?: string
  declare street: string
  declare number: string
  declare complement: string
  declare neighborhood: string
  declare city: string
  declare state: string
  declare zipCode: string
}