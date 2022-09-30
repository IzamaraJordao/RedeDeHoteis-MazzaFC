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
  room_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bedroom_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  position_X: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position_Y: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
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



