
import {sequelize} from './sequelize'

import { AddressSequelize } from './modelSequelize/address'
import { HotelSequelize } from './modelSequelize/hotel'
import { EmployeeSequelize } from './modelSequelize/employee'
import { GuestSequelize } from './modelSequelize/guest'
import { BedroomSequelize } from './modelSequelize/bedroom'
import { ReservationsSequelize } from './modelSequelize/reservations'



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
