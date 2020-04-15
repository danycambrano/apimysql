import {Personal} from '../models/personal.model';
import {Criterios} from '../models/personal.model';


    exports.create = (req,res)=>{
         // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    
    const personal = new Personal({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        descripcion: req.body.descripcion
    });
    const criterios = new Personal({
      criterio1: req.body.criterio1,
      porcentageC1: req.body.porcentageC1,
      criterio2: req.body.criterio2,
      porcentageC2: req.body.porcentageC2,
      criterio3: req.body.criterio3,
      porcentageC3: req.body.porcentageC3,
  });

    const criterio = new Personal({
      id_Materias: req.body.id_Materias,
      periodo: req.body.periodo,
      grupo_id: req.body.grupo_id,
      tema_nombre: req.body.tema1_nombre,
      fecha_limite: req.body.fecha_limite,
      numUnidad: req.body.numUnidad,

      criterio1: req.body.criterio1,
      porcentageC1: req.body.porcentageC1,
      criterio2: req.body.criterio2,
      porcentageC2: req.body.porcentageC2,
      criterio3: req.body.criterio3,
      porcentageC3: req.body.porcentageC3,
      criterio4: req.body.criterio4,
      porcentageC4: req.body.porcentageC4,
  });

Personal.create(criterio, (err, data) => {
  console.log('1')
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};


exports.createCalificacion = (req,res)=>{//ninico
  console.log(" creando calificacion")
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
}

const calificacion = new Criterios({
  calR1: req.body.calR1,
  calR2: req.body.calR2,
  calR3: req.body.calR3,
  calR4: req.body.calR4,
  calCriterio1: req.body.calCriterio1,
  calCriterio2: req.body.calCriterio2,
  calCriterio3: req.body.calCriterio3,
  calCriterio4: req.body.calCriterio4,
  calificaciontotal: req.body.calificaciontotal,
  unidad: req.body.unidad,
  idGrupoAsign: req.body.idGrupoAsign,
  materias_idmaterias: req.body.materias_idmaterias,
  materiaDocente_id: req.body.materiaDocente_id,
  criterios_idcat_Unidad: req.body.criterios_idcat_Unidad,
  aspirante_Folio: req.body.aspirante_Folio,
  registrocal_idcarrera: req.body.registrocal_idcarrera,
  periodo: req.body.periodo,
});

Criterios.createRegistocalificacion(calificacion, (err, data) => {
  
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });

}//fin


exports.findAll=(req, res)=>{
    Personal.getAll( (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Customer with id "
            });
          }
        } else res.send(data);
      });
}

exports.findOne = (req, res) => {// get por id
    Personal.findById(req.params.personalId,req.params.periodo, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({sin:"null"});// message: `Not found Customer with id ${req.params.personalId}.`
          } else {
            res.status(500).send({
              message: "Error retrieving Customer with id " + req.params.personalId
            });
          }
        } else res.send(data);
      });
};

exports.getPeriodo = (req, res) => {// get inicio periodo
  Personal.periodoActual( (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({sin:"null"});// message: `Not found Customer with id ${req.params.personalId}.`
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id "
          });
        }
      } else res.send(data);
    });
};//fin periodo

exports.horarios = (req, res) => {// get
  Personal.horario(req.params.periodo, req.params.idMateria, req.params.idDocente, req.params.grupo, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({sin:"null"});// message: `Not found Customer with id ${req.params.personalId}.`
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.idDocente
          });
        }
      } else res.send(data);
    });
};

exports.reporteListas = (req, res) => {// get
  Personal.reporteLista(req.params.periodo, req.params.idMateria, req.params.idDocente, req.params.grupo, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({sin:"null"});// message: `Not found Customer with id ${req.params.personalId}.`
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.idDocente
          });
        }
      } else res.send(data);
    });
};


exports.findTemas = (req, res) => {// get
  Personal.findTema(req.params.idDocente, req.params.idMateria, req.params.periodo,req.params.minimo, req.params.cierre, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({sin:"null"});// message: `Not found Customer with id ${req.params.personalId}.`
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.idDocente
          });
        }
      } else res.send(data);
    });
};

exports.findAlumnos = (req, res) => {// get por id
  console.log('...iniciando find alumnos<>>')
  Personal.findAlumno(req.params.idMateria, req.params.periodo, req.params.idDocente, req.params.unidad , (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({sin:"null"});// message: `Not found Customer with id ${req.params.personalId}.`
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.idDocente
          });
        }
      } else res.send(data);
    });
};


exports.findStadoTemas = (req, res) => {// get temas
  console.log('...iniciando findStadoTemas' + req.params.periodo+ req.params.id_Materia+ req.params.id_personal)
  Personal.finstadoTema(req.params.periodo, req.params.id_Materia, req.params.id_personal, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({sin:"null"});// message: `Not found Customer with id ${req.params.personalId}.`
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.idDocente
          });
        }
      } else res.send(data);
    });
};



exports.findCriterios = (req, res) => {// get por id
  console.log('...iniciando find alumnos')
  Personal.findCriterio(req.params.periodo, req.params.idMateria,  req.params.unidad, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({sin:"null"});// message: `Not found Customer with id ${req.params.personalId}.`
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with id " + req.params.idDocente
          });
        }
      } else res.send(data);
    });
};



exports.updateCriterios = (req, res) => {
  // Validate Request
  if (!req.body) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
 }

 Personal.updateCriterio(
   req.params.periodo,
   req.params.materia,
   req.params.unidad,
   req.params.grupo,
   new Personal(req.body),
   (err, data) => {
     if (err) {
       if (err.kind === "not_found") {
         res.status(404).send({
           message: `Not found Personal with id ${req.params.periodo}.`
         });
       } else {
         res.status(500).send({
           message: "Error updating Personal with id " + req.params.periodo
         });
       }
     } else res.send(data);
   }
 );
};


exports.updateCriteriosc1 = (req, res) => {
  // Validate Request
  if (!req.body) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
 }

 Personal.updateCriterioc1(
   req.params.periodo,
   req.params.materia,
   req.params.unidad,
   req.params.grupo,
   new Personal(req.body),
   (err, data) => {
     if (err) {
       if (err.kind === "not_found") {
         res.status(404).send({
           message: `Not found Personal with id ${req.params.periodo}.`
         });
       } else {
         res.status(500).send({
           message: "Error updating Personal with id " + req.params.periodo
         });
       }
     } else res.send(data);
   }
 );
};



exports.updateCriteriosc2 = (req, res) => {
  // Validate Request
  if (!req.body) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
 }

 Personal.updateCriterioc2(
   req.params.periodo,
   req.params.materia,
   req.params.unidad,
   req.params.grupo,
   new Personal(req.body),
   (err, data) => {
     if (err) {
       if (err.kind === "not_found") {
         res.status(404).send({
           message: `Not found Personal with id ${req.params.periodo}.`
         });
       } else {
         res.status(500).send({
           message: "Error updating Personal with id " + req.params.periodo
         });
       }
     } else res.send(data);
   }
 );
};


exports.updateCriteriosc3 = (req, res) => {
  // Validate Request
  if (!req.body) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
 }

 Personal.updateCriterioc3(
   req.params.periodo,
   req.params.materia,
   req.params.unidad,
   req.params.grupo,
   new Personal(req.body),
   (err, data) => {
     if (err) {
       if (err.kind === "not_found") {
         res.status(404).send({
           message: `Not found Personal with id ${req.params.periodo}.`
         });
       } else {
         res.status(500).send({
           message: "Error updating Personal with id " + req.params.periodo
         });
       }
     } else res.send(data);
   }
 );
};



exports.updateCriteriosc4 = (req, res) => {
  // Validate Request
  if (!req.body) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
 }

 Personal.updateCriterioc4(
   req.params.periodo,
   req.params.materia,
   req.params.unidad,
   req.params.grupo,
   new Personal(req.body),
   (err, data) => {
     if (err) {
       if (err.kind === "not_found") {
         res.status(404).send({
           message: `Not found Personal with id ${req.params.periodo}.`
         });
       } else {
         res.status(500).send({
           message: "Error updating Personal with id " + req.params.periodo
         });
       }
     } else res.send(data);
   }
 );
};





exports.updateCalificaciones = (req, res) => {
  // Validate Request
  if (!req.body) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
 }

 Criterios.updateCalificacion(
   req.params.idCalificacion,
   
   new Criterios(req.body),
   (err, data) => {
     if (err) {
       if (err.kind === "not_found") {
         res.status(404).send({
           message: `Not found Personal with id ${req.params.periodo}.`
         });
       } else {
         res.status(500).send({
           message: "Error updating Personal with id " + req.params.periodo
         });
       }
     } else res.send(data);
   }
 );
};





exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
   res.status(400).send({
     message: "Content can not be empty!"
   });
 }

 Personal.updateById(
   req.params.personalId,
   new Personal(req.body),
   (err, data) => {
     if (err) {
       if (err.kind === "not_found") {
         res.status(404).send({
           message: `Not found Personal with id ${req.params.personalId}.`
         });
       } else {
         res.status(500).send({
           message: "Error updating Personal with id " + req.params.personalId
         });
       }
     } else res.send(data);
   }
 );
};

exports.delete = (req, res) => {
  Personal.remove(req.params.personalId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Personal with id ${req.params.personalId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Personal with id " + req.params.personalId
          });
        }
      } else res.send({ message: `Personal was deleted successfully!` });
    });
};

exports.deleteAll = (req, res) => {
  Personal.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all personal."
        });
      else res.send({ message: `All Personal were deleted successfully!` });
    });
};