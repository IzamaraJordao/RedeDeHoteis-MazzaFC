import { DataTypes } from 'sequelize';
// import { Address } from '../../models/address';
import { sequelize } from '../sequelize'
import { HotelSequelize } from './hotel';

export const EmployeeSequelize = sequelize.define(
  'Employee',{
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
  hotel_id: {
    type: DataTypes.STRING(36),
    allowNull: true,
  },
  is_first_access: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  address_id: {
    type: DataTypes.STRING(36),
    allowNull: true,
   
  },
},
  {
    underscored: true,
    modelName: 'Employee',
    tableName: 'employee',
  },
)

HotelSequelize.hasMany(EmployeeSequelize, { foreignKey: 'hotel_id' });
EmployeeSequelize.belongsTo(HotelSequelize, { constraints: true ,foreignKey: 'hotel_id'});





