
import { DataTypes} from 'sequelize';
import { sequelize } from '../sequelize'


export const HotelSequelize = sequelize.define(
  'hotel',{
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
  underscored: true,
  modelName: 'hotel', 
  tableName: 'hotel',
});

//
