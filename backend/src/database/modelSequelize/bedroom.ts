import { DataTypes } from 'sequelize';
// import { Address } from '../../models/address';
import { sequelize } from '../sequelize'

export const BedroomSequelize = sequelize.define(
  'bedroom',{
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  guest_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  bedroom_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  //hotel andar posição x e y;
},
  {
    underscored: true,
    modelName: 'Reservations',
    tableName: 'reservations',
  },
)