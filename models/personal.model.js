import pool from '../database';
import { request } from 'express';

const Personal= function (personal){
    this.nombre = personal.nombre;
    this.apellidos= personal.apellidos;
    this.descripcion=personal.descripcion;
}

Personal.create = async (nuevoPersonal, result) => {
   await pool.query("INSERT INTO users SET ?", nuevoPersonal, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created nuevo personal: ", { id: res.insertId, ...nuevoPersonal });
      result(null, { id: res.insertId, ...nuevoPersonal });
    });
  };

  Personal.getAll = async( result) => {
    await pool.query(`SELECT * FROM users`, (err, res) => {
       if (err) {
         console.log("error: ", err);
         result(err, null);
         return;
       }
   
       if (res.length) {
        //console.log("found personal: ",res);
         result(null, res);
         return;
       }
   
       // not found Customer with the id
       result({ kind: "not_found" }, null);
     });
   };
 


 
Personal.findById = async(personalId, result) => {
   await pool.query(`SELECT * FROM users WHERE id = ${personalId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found personal: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

  Personal.updateById = async (id, personal, result) => {
    await pool.query(
      "UPDATE users SET nombre = ?, apellidos = ?, descripcion = ? WHERE id = ?",
      [personal.nombre, personal.apellidos, personal.descripcion, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Customer with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("Datos de personal actualizados: ", { id: id, ...personal });
        result(null, { id: id, ...personal });
      }
    );
  };


  Personal.remove = async (id, result) => {
    await pool.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted personal with id: ", id);
      result(null, res);
    });
  };

  Personal.removeAll = async result => {
   await pool.query("DELETE FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };
    

module.exports=Personal;