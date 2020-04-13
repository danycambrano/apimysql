import routerx from 'express-promise-router';
import administrador from '../controllers/adminstrador.controller';
const router=routerx();

router.get('/fechas/:periodo',administrador.allDate);
router.post('/fechas/registrar',administrador.registrar);


export default router;