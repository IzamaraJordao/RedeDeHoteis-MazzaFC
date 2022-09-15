import { DataTypes, Model, Optional } from 'sequelize';
import { db as sequelize } from '..'


type GuestAttributes = {
  id?: string
  name: string
  cpf: string
  rg: string
  email?: string
  phone: string
  address_id?: string
};

type GuestCreationAttributes = Optional<GuestAttributes, 'id'|'email'>;

export class GuestSequelize extends Model<GuestAttributes, GuestCreationAttributes> {
   declare id?: string
   declare name: string
   declare cpf: string
   declare rg: string
   declare email?: string
   declare phone: string
   declare address_id?: string
}

GuestSequelize.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
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
  modelName: 'guest',
});

//
