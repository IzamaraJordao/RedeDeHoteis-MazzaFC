import { DataTypes} from 'sequelize';
import { sequelize } from '../sequelize'
import { ReservationGuestSequelize } from './reservations';



export const GuestSequelize = sequelize.define(
  'Guest',{
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'address',
      key: 'id',
    }
  }
},
    {
      underscored: true,
      modelName: 'Guest',
      tableName: 'guest',
    },
);

GuestSequelize.hasMany(ReservationGuestSequelize, {  foreignKey: 'guest_id' });
ReservationGuestSequelize.belongsTo(GuestSequelize, { constraints: true ,foreignKey: 'guest_id'});



//
