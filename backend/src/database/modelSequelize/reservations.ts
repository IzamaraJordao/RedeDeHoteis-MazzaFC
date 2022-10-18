import { DataTypes} from 'sequelize';
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
    modelName: 'Reservations',
    tableName: 'reservations',
  },

)






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

ReservationsSequelize.hasMany(ReservationGuestSequelize, { foreignKey: 'reservation_id' });
ReservationGuestSequelize.belongsTo(ReservationsSequelize, { constraints: true ,foreignKey: 'reservation_id'});
