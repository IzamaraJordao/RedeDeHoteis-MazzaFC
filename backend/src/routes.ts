import {Router} from 'express';
import {controllerExpress} from './helpers/controllerExpress';
import { getEmployee, login, getGuest, createEmployee, createHotel, getHotel, deleteEmployee, createGuest, getBedroom, deleteBedroom, paginateEmployee, paginateBedroom, paginateReservations, getReservations, createReservations, deleteReservations, paginateGuest, deleteGuest, updateGuest, updateEmployee, updateReservations, paginateHotel, deleteHotel, updateBedroom } from './composers';

const router = Router();


// Employess
router.get('/employee', controllerExpress(paginateEmployee));
router.get('/employee/:id',controllerExpress(getEmployee) )
router.post('/employee', controllerExpress(createEmployee))
router.delete('/employee/:id', controllerExpress(deleteEmployee))
router.put('/employee/:id', controllerExpress(updateEmployee))

/// Auth
router.post('/login' , controllerExpress(login, "PUBLIC"))

///hotel
router.post('/hotel', controllerExpress(createHotel))
router.get('/hotel/:id', controllerExpress(getHotel))
router.get('/hotel', controllerExpress(paginateHotel))
router.delete('/hotel/:id', controllerExpress(deleteHotel))

//guest
router.get('/guest', controllerExpress(paginateGuest))
router.get('/guest/:id', controllerExpress(getGuest))
router.post('/guest', controllerExpress(createGuest))
router.delete('/guest/:id', controllerExpress(deleteGuest))
router.put('/guest/:id', controllerExpress(updateGuest))


//bedroom
router.get('/bedroom', controllerExpress(paginateBedroom));
router.get('/bedroom/:id', controllerExpress(getBedroom))
router.delete('/bedroom/:id', controllerExpress(deleteBedroom))
router.put('/bedroom/:id', controllerExpress(updateBedroom))
//reservations
router.get('/reservations', controllerExpress(paginateReservations));
router.get('/reservations/:id', controllerExpress(getReservations))
router.post('/reservations', controllerExpress(createReservations))
router.delete('/reservations/:id', controllerExpress(deleteReservations))
router.put('/reservations/:id', controllerExpress(updateReservations))

export default router;
///
