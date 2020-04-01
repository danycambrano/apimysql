
import routerx from 'express-promise-router';
import personalController from '../controllers/personal.controller';


const router=routerx();

router.post('/add',personalController.create);
router.get('/consultar', personalController.findAll);
router.get('/consultar/:personalId', personalController.findOne);
router.get('/consultarTema/:idDocente/:idMateria/:periodo/:cierre', personalController.findTemas);
router.put('/update/:personalId', personalController.update);
router.delete('/delete/:personalId', personalController.delete);
router.delete('/deleted',personalController.deleteAll);

export default router;