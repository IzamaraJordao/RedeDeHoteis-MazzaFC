import { DataTypes, Model, Optional } from 'sequelize';
import { Address } from '../../models/address';
import { db as sequelize } from '..'


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
  address_id?: string
};

type UserCreationAttributes = Optional<EmployeeAttributes, 'id' | 'address_id'>;

export class EmployeeSequelize extends Model<EmployeeAttributes, UserCreationAttributes> {
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
   declare address_id?: string
}

EmployeeSequelize.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hotel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_first_access: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  address_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'address',
      key: 'id',
    }
  },
}, {
  sequelize,
  modelName: 'employee',
});


