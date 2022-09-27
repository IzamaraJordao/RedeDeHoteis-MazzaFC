import { DataTypes } from 'sequelize';
// import { Address } from '../../models/address';
import { sequelize } from '../sequelize'

export const ReservationsSequelize = sequelize.define(
  'reservations',{
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  guest_consumption: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  check_in: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  check_out: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  guest_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
},
  {
    underscored: true,
    modelName: 'Bedroom',
    tableName: 'bedroom',
  },
)