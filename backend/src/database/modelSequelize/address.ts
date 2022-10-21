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
AddressSequelize.hasMany(GuestSequelize, { foreignKey: 'address_id' });
GuestSequelize.belongsTo(AddressSequelize, { constraints: true ,foreignKey: 'address_id'});
////// Employee
AddressSequelize.hasMany(EmployeeSequelize, { foreignKey: 'address_id' });
EmployeeSequelize.belongsTo(AddressSequelize, { constraints: true ,foreignKey: 'address_id'});
////// Hotel
AddressSequelize.hasMany(HotelSequelize, { foreignKey: 'address_id' });
HotelSequelize.belongsTo(AddressSequelize, { constraints: true ,foreignKey: 'address_id'});


//
