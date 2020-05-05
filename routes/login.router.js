import routerx from 'express-promise-router';
import login from '../controllers/login.controller';

const router=routerx();

router.post('/login',login.login);


export default router;