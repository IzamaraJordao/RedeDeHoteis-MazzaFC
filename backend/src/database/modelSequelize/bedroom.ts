import { DataTypes } from 'sequelize';
import { ReservationsSequelize,ReservationGuestSequelize  } from './reservations';

// import { Address } from '../../models/address';
import { sequelize } from '../sequelize'

export const BedroomSequelize = sequelize.define(
  'Bedroom',{
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  hotel_id: {
    type: DataTypes.STRING(36),
    allowNull: true,
  },
  floor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status_room_id:{
    type: DataTypes.STRING(36),
    allowNull: true,
  },
  room_type_id:{
    type: DataTypes.STRING(36),
    allowNull: true,
  },
  position_x: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position_y: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }
  
},
  {
    underscored: true,
    modelName: 'Bedroom',
    tableName: 'bedroom',
  },
)
BedroomSequelize.belongsToMany(ReservationsSequelize,{through: 'reservationGuest'});
ReservationsSequelize.belongsToMany(BedroomSequelize,{through: 'reservationGuest'});
ReservationGuestSequelize.belongsTo(ReservationsSequelize);
ReservationGuestSequelize.belongsTo(BedroomSequelize);
BedroomSequelize.hasMany(ReservationGuestSequelize, { foreignKey: 'id' });
ReservationsSequelize.hasMany(ReservationGuestSequelize, { foreignKey: 'id' });

/////////////////////////////////////////////////////////////////////////////////////////



