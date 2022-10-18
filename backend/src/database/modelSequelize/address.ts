import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize'
import { EmployeeSequelize } from './employee';
import { GuestSequelize } from './guest';
import { HotelSequelize } from './hotel';

export const AddressSequelize = sequelize.define(
  'Address',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    modelName: 'Address',
    tableName: 'address',
    
  },
)

/////// Guest
GuestSequelize.hasMany(AddressSequelize, { foreignKey: 'address_id' });
AddressSequelize.belongsTo(GuestSequelize, { constraints: true ,foreignKey: 'address_id'});
////// Employee
EmployeeSequelize.hasMany(AddressSequelize, { foreignKey: 'address_id' });
AddressSequelize.belongsTo(EmployeeSequelize, { constraints: true ,foreignKey: 'address_id'});
////// Hotel
HotelSequelize.hasMany(AddressSequelize, { foreignKey: 'address_id' });
AddressSequelize.belongsTo(HotelSequelize, { constraints: true ,foreignKey: 'address_id'});

//
