import { DataTypes } from 'sequelize'
import { sequelize } from '../sequelize'


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


//
