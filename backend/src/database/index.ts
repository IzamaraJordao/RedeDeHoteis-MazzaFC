
import {sequelize} from './sequelize'

import { AddressSequelize } from './modelSequelize/address'
import { HotelSequelize } from './modelSequelize/hotel'
import { EmployeeSequelize } from './modelSequelize/employee'
import { GuestSequelize } from './modelSequelize/guest'
import { BedroomSequelize } from './modelSequelize/bedroom'
import { ReservationsSequelize } from './modelSequelize/reservations'
import { ReservationGuestSequelize } from './modelSequelize/reservations'
import { ScheduleSequelize } from './modelSequelize/schedule'



export {
  sequelize as db,
  AddressSequelize,
  HotelSequelize,
  EmployeeSequelize,
  GuestSequelize,
  BedroomSequelize,
  ReservationsSequelize,
  ReservationGuestSequelize,
  ScheduleSequelize,
  sequelize,
}

//
