import Personal from '../models/personal.model';


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

Personal.create(personal, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

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

exports.findOne = (req, res) => {
    Personal.findById(req.params.personalId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.personalId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Customer with id " + req.params.personalId
            });
          }
        } else res.send(data);
      });
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