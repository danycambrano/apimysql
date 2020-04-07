
import routerx from 'express-promise-router';
import personalController from '../controllers/personal.controller';


const router=routerx();

router.post('/add',personalController.create);
router.post('/add/calificacion',personalController.createCalificacion);

router.get('/consultar', personalController.findAll);
router.get('/consultar/:personalId', personalController.findOne);
router.get('/consultarTema/:idDocente/:idMateria/:periodo/:cierre', personalController.findTemas);
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
router.delete('/delete/:personalId', personalController.delete);
router.delete('/deleted',personalController.deleteAll);

export default router;