import {GetEmployee} from './use-case/employees/get';
import { employeeRepository } from './models/employees';
import { Login } from './use-case/auth/login';
import { hotelRepository } from './models/hotel';
import { tokenGenerator } from './helpers/tokenGenerator';
import { encrypter } from './helpers/encrypter';
// import { GetHotel } from './use-case/hotel/get';
import { GetGuest } from './use-case/guest/get';
import { guestRepository } from './models/guest';
import { CreateEmployee } from './use-case/employees/create';
import { CreateHotel } from './use-case/hotel/create';


///Employee
export const getEmployee = new GetEmployee(employeeRepository);
export const createEmployee = new CreateEmployee(employeeRepository, encrypter);

//

// Auth
export const login = new Login(employeeRepository, hotelRepository, encrypter, tokenGenerator);

///hotel
export const getHotel = new CreateHotel(hotelRepository);
export const createHotel = new CreateHotel(hotelRepository);

///guest
export const getGuest = new GetGuest(guestRepository);


//
