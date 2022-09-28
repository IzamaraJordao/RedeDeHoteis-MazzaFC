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
  }
},
  {
    underscored: true,
    modelName: 'Bedroom',
    tableName: 'bedroom',
  },

)

ReservationsSequelize.hasMany(sequelize.models.Guest, { foreignKey: 'id' });
ReservationsSequelize.hasOne(sequelize.models.Bedroom, { foreignKey: 'id' });


export const ReservationGuestSequelize = sequelize.define(
    'reservationGuest', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    guest_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    reservation_id:{
        type: DataTypes.UUID,
        allowNull: false,
    }
},
    {
        underscored: true,
        modelName: 'reservationGuest',
        tableName: 'reservationGuest',
    },

)
