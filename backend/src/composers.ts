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
import { DeleteEmployee } from './use-case/employees/delete';
import { CreateGuest } from './use-case/guest/create';
import { GetBedroom } from './use-case/bedroom/get';
import { CreateBedroom } from './use-case/bedroom/create';
import { DeleteBedroom } from './use-case/bedroom/delete';
import { bedroomRepository } from './models/bedroom';
import { PaginateEmployee } from './use-case/employees/paginate';
import { GetHotel } from './use-case/hotel/get';


///Employee
export const paginateEmployee = new PaginateEmployee(employeeRepository);
export const getEmployee = new GetEmployee(employeeRepository);
export const createEmployee = new CreateEmployee(employeeRepository, encrypter);
export const deleteEmployee = new DeleteEmployee(employeeRepository);
//

// Auth
export const login = new Login(employeeRepository, hotelRepository, encrypter, tokenGenerator);

///hotel
export const getHotel = new GetHotel(hotelRepository);
export const createHotel = new CreateHotel(hotelRepository);

///guest
export const getGuest = new GetGuest(guestRepository);
export const createGuest = new CreateGuest(guestRepository);


// bedroom
export const getBedroom = new GetBedroom(bedroomRepository);
export const createBedroom = new CreateBedroom(bedroomRepository);
export const deleteBedroom = new DeleteBedroom(bedroomRepository);
