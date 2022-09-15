import {Router} from 'express';
import {controllerExpress} from './helpers/controllerExpress';
import { getEmployee, login, getGuest, createEmployee, createHotel, getHotel } from './composers';

const router = Router();


// Employess
router.get('/employees', controllerExpress(getEmployee));
router.get('/employee/:id',controllerExpress(getEmployee) )
router.post('/employee', controllerExpress(createEmployee))
/// Auth
router.post('/login' , controllerExpress(login, "PUBLIC"))

///hotel
router.post('/hotel', controllerExpress(createHotel))
router.get('/hotel', controllerExpress(getHotel))

//guest
router.get('/guest/:id', controllerExpress(getGuest))


export default router;
///
