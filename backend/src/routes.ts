import {Router} from 'express';
import {controllerExpress} from './helpers/controllerExpress';
import { getEmployee, login, getGuest } from './composers';

const router = Router();


// Employess
router.get('/employee/:id',controllerExpress(getEmployee) )
router.get('/employee' , controllerExpress(getEmployee) )


/// Auth
router.post('/login', controllerExpress(login))

///hotel
// router.get('/hotel/:id', controllerExpress(getHotel))

//guest
router.get('/guest/:id', controllerExpress(getGuest))


export default router;
///
