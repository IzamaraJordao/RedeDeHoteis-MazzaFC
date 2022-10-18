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
  },
  check_in_static:{
    type: DataTypes.DATE,
    allowNull: false,

  },
  check_out_static:{
    type: DataTypes.DATE,
    allowNull: false,
  },
  bedroom_id:{
    type: DataTypes.UUID,
    allowNull: false,
    
  }
},
  {
    underscored: true,
    modelName: 'Reservations',
    tableName: 'reservations',
  },

)

  // ReservationsSequelize.hasMany(sequelize.models.Guest, { foreignKey: 'id_guest' });
  // ReservationsSequelize.belongsTo(sequelize.models.bedroom, {foreignKey: 'id_bedroom'});




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
