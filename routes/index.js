const routerx= require ('express-promise-router');
import personalRouter from './personal.routes';
import administradorRouter from './administrador.router';

 
const router = routerx();

router.use('/personal',personalRouter);
router.use('/administrador',administradorRouter)

module.exports= router;