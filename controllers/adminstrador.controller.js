import {Admin} from '../models/administrador.model';


exports.allDate=(req, res)=>{
  console.log("admin")
    Admin.date(req.params.periodo, (err, data) => {
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



exports.registrar = (req,res)=>{//ninico
  console.log(" creando fechas")
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
}

const fechas = new Admin({
  primera_entrega:req.body.primera_entrega,
  segunda_entrega:req.body.segunda_entrega,
  tercera_entrega:req.body.tercera_entrega,
  entrega_final:req.body.entrega_final,
  periodo: req.body.periodo,
});

Admin.registrarFecha(fechas, (err, data) => {
  
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });

}//fin