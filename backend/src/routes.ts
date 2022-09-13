import {Router} from 'express';
import {controllerExpress} from './helpers/controllerExpress';
import { getEmployee, login } from './composers';

const router = Router();


// Employess
router.get('/employee/:id',controllerExpress(getEmployee) )

/// Auth
router.post('/login', controllerExpress(login))

///
