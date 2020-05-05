
import { request } from 'express';
import {Reportes} from '../models/reportes.model'



 exports.login = ('/login', (req, res) => {
	const { usuario, password } = req.body;
    Reportes.logeo(usuario,password, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({sin:"null"});// message: `Not found Customer with id ${req.params.personalId}.`
          } else {
            res.status(500).send({
              data:"error "
            });
          }
        } else res.status(200).json(data);
      });

});