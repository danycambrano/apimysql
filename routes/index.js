const routerx= require ('express-promise-router');
import personalRouter from './personal.routes';

 
const router = routerx();

router.use('/personal',personalRouter);

module.exports= router;