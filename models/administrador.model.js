import pool from '../database';
import { request } from 'express';

const Admin = function (administrador) {
    this.primera_entrega= administrador.primera_entrega;
    this.segunda_entrega= administrador.segunda_entrega;
    this.tercera_entrega= administrador.tercera_entrega;
    this.entrega_final= administrador.entrega_final;

    this.periodo= administrador.periodo;
  }




  Admin.date = async (periodo,result) => { // get por id
    const query = `SELECT * FROM cierre_de_acta
    where cierre_de_acta.periodo = ${periodo};`; // 
  
    await pool.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found fechas: ", res[0]);
        result(null, res);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };
  

  
  Admin.registrarFecha = async (administrador, result) => {//guardar calificacion
    console.log("esto es el metodo guardar")
  const query = `
  replace INTO cierre_de_acta
  (primera_entrega, segunda_entrega, tercera_entrega, entrega_final, periodo) 
  VALUES ('${administrador.primera_entrega}', '${administrador.segunda_entrega}', 
  '${administrador.tercera_entrega}', '${administrador.entrega_final}', '${administrador.periodo}');`;

  await pool.query(query, (err, res) => {
   

    if (err) {
      
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created nuevo registro: ");
    result(null, { status:'ok'});
  

  });
};//fin


module.exports = {Admin};