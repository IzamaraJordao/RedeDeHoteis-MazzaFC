
import { DataTypes, Model, Optional } from 'sequelize';
import { db as sequelize } from '..'

type HotelAttributes = {
  id?: string
  cnpj: number
  name: string
  phone: string
  email: string
  address_id?: string
};

type HotelCreationAttributes = Optional<HotelAttributes, 'id'>;

export class HotelSequelize extends Model<HotelAttributes, HotelCreationAttributes> {
 declare id?: string
 declare cnpj: string
 declare name: string
 declare phone: string
 declare email: string
  declare address_id?: string
}

HotelSequelize.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
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
  modelName: 'hotel', 
});

//
