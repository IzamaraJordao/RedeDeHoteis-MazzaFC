import { DataTypes} from 'sequelize';
import { sequelize } from '../sequelize'




export const ScheduleSequelize = sequelize.define(
    'Schedule', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    data_initial: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bedroom_id:{
        type: DataTypes.UUID,
        allowNull: false,
        
    },
    reservation_id:{
        type: DataTypes.UUID,
        allowNull: false,
    },
},
{
  underscored: true,
  modelName: 'Schedule',
  tableName: 'schedule',
},

)

