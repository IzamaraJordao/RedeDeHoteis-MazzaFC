import { DataTypes, Model, Optional } from 'sequelize'
import { db as sequelize } from '..'

type AddressAttributes = {
  id?: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

type UserCreationAttributes = Optional<AddressAttributes, 'id'>

export class AddressSequelize extends Model<
  AddressAttributes,
  UserCreationAttributes
> {
  declare id?: string
  declare street: string
  declare number: string
  declare complement: string
  declare neighborhood: string
  declare city: string
  declare state: string
  declare zipCode: string
}

AddressSequelize.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complement: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'address' },
)
//
