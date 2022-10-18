
import { DataTypes} from 'sequelize';
import { sequelize } from '../sequelize'
import { BedroomSequelize } from './bedroom';


export const StatusRoomSequelize = sequelize.define(
  'status_room',{
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  underscored: true,
  modelName: 'status_room', 
  tableName: 'status_room',
});

StatusRoomSequelize.hasMany(BedroomSequelize, { foreignKey: 'status_room_id' });
BedroomSequelize.belongsTo(StatusRoomSequelize, { constraints: true ,foreignKey: 'status_room_id'});
//
