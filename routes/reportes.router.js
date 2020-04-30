import routerx from 'express-promise-router';
import reportesController from '../controllers/reportes.controller';

const router=routerx();

router.get('/consultar/parciales/:periodo/:idMateria/:idPersonal/:grupo',reportesController.getParciales);


export default router;