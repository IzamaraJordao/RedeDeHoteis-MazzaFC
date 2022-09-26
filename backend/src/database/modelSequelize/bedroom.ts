import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../sequelize'

type BedroomAttributes = {
  id?: string
  guest_id: string
  status: string
  tipo: string
}

type BedroomCreationAttributes = Optional<BedroomAttributes, 'id'>

export class BedroomSequelize extends Model<
  BedroomAttributes,
  BedroomCreationAttributes
> {
  declare id?: string
  declare guest_id: string
  declare status: string
  declare tipo: string
}

BedroomSequelize.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guest_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'guest',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'bedroom',
  },
)

//
