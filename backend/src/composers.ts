import {GetEmployee} from './use-case/employees/get';
import { employeeRepository } from './models/employees';
import { Login } from './use-case/auth/login';
import { hotelRepository } from './models/hotel';
import { tokenGenerator } from './helpers/tokenGenerator';
import { encrypter } from './helpers/encrypter';

export const getEmployee = new GetEmployee(employeeRepository);
//

// Auth
export const login = new Login(employeeRepository, hotelRepository, encrypter, tokenGenerator);

///
