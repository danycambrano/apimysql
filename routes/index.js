const routerx= require ('express-promise-router');
import personalRouter from './personal.routes';
import administradorRouter from './administrador.router';
import reportes from './reportes.router'

 
const router = routerx();

router.use('/personal',personalRouter);
router.use('/administrador',administradorRouter)
router.use('/reportes',reportes)

module.exports= router;