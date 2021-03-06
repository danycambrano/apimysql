
import routerx from 'express-promise-router';
import personalController from '../controllers/personal.controller';
import auth from './middlewares/auth'


const router=routerx();
//rutas actualizar periodo
router.get('/consultar/periodo',auth.verifyAdministrador,personalController.getPeriodo);
router.post('/add',personalController.create);
router.post('/add/calificacion',personalController.createCalificacion);

router.get('/consultar',auth.verifyDocente, personalController.findAll);
router.get('/consultar/:personalId/:periodo', personalController.findOne);
router.get('/consultarTema/:idDocente/:idMateria/:periodo/:minimo/:cierre', personalController.findTemas);
router.get('/consultarAlumnos/:idMateria/:periodo/:idDocente/:unidad', personalController.findAlumnos);//unidad idmaterias periodo idpersonal
router.get('/consultar/estado/temas/:periodo/:id_Materia/:id_personal', personalController.findStadoTemas);//<
router.get('/consultarCriterios/:periodo/:idMateria/:unidad', personalController.findCriterios);

router.put('/update/criterios/:periodo/:materia/:unidad/:grupo', personalController.updateCriterios);
router.put('/update/criteriosc1/:periodo/:materia/:unidad/:grupo', personalController.updateCriteriosc1);
router.put('/update/criteriosc2/:periodo/:materia/:unidad/:grupo', personalController.updateCriteriosc2);
router.put('/update/criteriosc3/:periodo/:materia/:unidad/:grupo', personalController.updateCriteriosc3);
router.put('/update/criteriosc4/:periodo/:materia/:unidad/:grupo', personalController.updateCriteriosc4);
router.put('/update/calificaciones/:idCalificacion', personalController.updateCalificaciones);
router.put('/update/:personalId', personalController.update);

//rutas reporte
router.get('/consultar/reporte/horarios/:periodo/:idMateria/:idDocente/:grupo', personalController.horarios);
router.get('/consultar/reporte/lista/:periodo/:idMateria/:idDocente/:grupo', personalController.reporteListas);




router.delete('/delete/:personalId', personalController.delete);
router.delete('/deleted',personalController.deleteAll);

export default router;