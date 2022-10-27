
import { DataTypes} from 'sequelize';
import { sequelize } from '../sequelize'
import { BedroomSequelize } from './bedroom';


export const HotelSequelize = sequelize.define(
  'Hotel',{
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  floor_hotel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  address_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'address',
      key: 'id',
    }
  },
}, {
  underscored: true,
  modelName: 'Hotel', 
  tableName: 'hotel',
});

HotelSequelize.hasMany(BedroomSequelize, { foreignKey: 'hotel_id' });
BedroomSequelize.belongsTo(HotelSequelize, { constraints: true ,foreignKey: 'hotel_id'});

//
