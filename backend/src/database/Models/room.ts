import { sequelize } from '..'
import { DataTypes } from 'sequelize'
const Room = sequelize.define(
  'Room',
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  },
)
