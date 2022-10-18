
import { DataTypes} from 'sequelize';
import { sequelize } from '../sequelize'
import { BedroomSequelize } from './bedroom';


export const TypeRoomSequelize = sequelize.define(
  'room_type',{
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  underscored: true,
  modelName: 'room_type', 
  tableName: 'room_type',
});

TypeRoomSequelize.hasMany(BedroomSequelize, { foreignKey: 'room_type_id' });
BedroomSequelize.belongsTo(TypeRoomSequelize, { constraints: true ,foreignKey: 'room_type_id'});

//
