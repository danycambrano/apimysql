import {Reportes} from '../models/reportes.model';



exports.getParciales=(req, res)=>{
    console.log("Reportesss")
    Reportes.getParcial(req.params.periodo, req.params.idMateria,req.params.idPersonal,req.params.grupo,(err, data) => {
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

