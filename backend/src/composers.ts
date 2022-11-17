

import { GetGuestByCpf } from './use-case/guest/getCpf';
import {GetEmployee} from './use-case/employees/get';
import { employeeRepository } from './models/employees';
import { Login } from './use-case/auth/login';
import { hotelRepository } from './models/hotel';
import { tokenGenerator } from './helpers/tokenGenerator';
import { encrypter } from './helpers/encrypter';

import { GetGuest } from './use-case/guest/get';
import { guestRepository } from './models/guest';
import { CreateEmployee } from './use-case/employees/create';
import { CreateHotel } from './use-case/hotel/create';
import { DeleteEmployee } from './use-case/employees/delete';
import { CreateGuest } from './use-case/guest/create';
import { bedroomRepository } from './models/bedroom';
import { PaginateEmployee } from './use-case/employees/paginate';
import { GetBedroomByFloor } from './use-case/bedroom/getBedroomByFloor';
import { GetHotel } from './use-case/hotel/get';
import { PaginateReservations } from './use-case/reservations/paginate';
import { reservationsRepository } from './models/reservations';
import { GetReservations } from './use-case/reservations/get';
import { CreateReservations } from './use-case/reservations/create';
import { DeleteReservations } from './use-case/reservations/delete';
import { PaginateGuest } from './use-case/guest/paginate';
import { DeleteGuest } from './use-case/guest/delete';
import { UpdateGuest } from './use-case/guest/update';
import { UpdateEmployee } from './use-case/employees/update';
import { UpdateReservations } from './use-case/reservations/update';
import { PaginateHotel } from './use-case/hotel/paginate';
import { DeleteHotel } from './use-case/hotel/delete';
import { UpdateBedroom } from './use-case/bedroom/update';
import { typeRepository } from './models/typeBedroom';
import { PaginateType } from './use-case/type/paginate';
import { statusRepository } from './models/statusBedroom';
import { PaginateStatus } from './use-case/statusBedroom/paginate';
import { GetFloors } from './use-case/bedroom/getFloors ';
import { GetBedroom } from './use-case/bedroom/getById';


 // composer controller generico 
///Employee
export const paginateEmployee = new PaginateEmployee(employeeRepository);
export const getEmployee = new GetEmployee(employeeRepository);
export const createEmployee = new CreateEmployee(employeeRepository, encrypter);
export const deleteEmployee = new DeleteEmployee(employeeRepository);
export const updateEmployee = new UpdateEmployee(employeeRepository);
//

// Auth
export const login = new Login(employeeRepository, hotelRepository, encrypter, tokenGenerator);

///hotel
export const paginateHotel = new PaginateHotel(hotelRepository);
export const getHotel = new GetHotel(hotelRepository);
export const createHotel = new CreateHotel(hotelRepository, bedroomRepository);
export const deleteHotel = new DeleteHotel(hotelRepository);


///guest
export const paginateGuest = new PaginateGuest(guestRepository);
export const getGuest = new GetGuest(guestRepository);
export const createGuest = new CreateGuest(guestRepository);
export const deleteGuest = new DeleteGuest(guestRepository);
export const updateGuest = new UpdateGuest(guestRepository);
export const getGuestByCpf = new GetGuestByCpf(guestRepository);


// bedroom
export const paginateBedroom = new GetBedroomByFloor(bedroomRepository);
export const getFloors = new GetFloors(bedroomRepository);
export const updateBedroom = new UpdateBedroom(bedroomRepository);
export const getBedroom = new GetBedroom(bedroomRepository);


// reservations
export const paginateReservations = new PaginateReservations(reservationsRepository);
export const getReservations = new GetReservations(reservationsRepository);
export const createReservations = new CreateReservations(reservationsRepository);
export const deleteReservations = new DeleteReservations(reservationsRepository);
export const updateReservations = new UpdateReservations(reservationsRepository);

///type
export const paginateType = new PaginateType(typeRepository);
//status
export const paginateStatus = new PaginateStatus(statusRepository);

// 

