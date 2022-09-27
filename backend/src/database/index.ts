import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'

import { AddressSequelize } from './modelSequelize/address'
import { HotelSequelize } from './modelSequelize/hotel'
import { EmployeeSequelize } from './modelSequelize/employee'
import { GuestSequelize } from './modelSequelize/guest'
import { BedroomSequelize } from './modelSequelize/bedroom'
import { ReservationsSequelize } from './modelSequelize/reservations'

dotenv.config()

const sequelize = new Sequelize({
  database: process.env.DB_DATABASE as string,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT as string),
  dialect: 'mysql',
})

export {
  sequelize as db,
  AddressSequelize,
  HotelSequelize,
  EmployeeSequelize,
  GuestSequelize,
  BedroomSequelize,
  ReservationsSequelize,
  sequelize,
}

//
