import { AddressSequelize } from './modelSequelize/address'
import { HotelSequelize } from './modelSequelize/hotel'
import { EmployeeSequelize } from './modelSequelize/employee'
import { GuestSequelize } from './modelSequelize/guest'
import { sequelize } from './sequelize'

// AddressSequelize.belongsTo(EmployeeSequelize)
// EmployeeSequelize.hasOne(AddressSequelize, { foreignKey:'address_id' });

export {
  sequelize as db,
  AddressSequelize,
  HotelSequelize,
  EmployeeSequelize,
  GuestSequelize,
  sequelize,
}

//
