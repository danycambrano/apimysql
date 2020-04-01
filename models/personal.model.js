import pool from '../database';
import { request } from 'express';

const Personall= function (personal){
    this.nombre = personal.nombre;
    this.apellidos= personal.apellidos;
    this.descripcion=personal.descripcion;
}
const Personal= function (criterio){
  this.id_Materias = criterio.id_Materias;
  this.periodo = criterio.periodo;
  this.grupo_id =criterio.grupo_id;
  this.tema_nombre= criterio.tema_nombre;
  this.fecha_limite = criterio.fecha_limite;
  
}
Personal.create = async (criterio, result) => {//guardar temas
  console.log('2')
  
const query = `INSERT INTO criterios (numUnidad,nomUnidad, materias_idmaterias, periodo, asingnacion_grupo_id,fecha_limite) VALUES ('1','${criterio.tema_nombre}', '${criterio.id_Materias}', '${criterio.periodo}', '${criterio.grupo_id}', '${criterio.fecha_limite}');`

   await pool.query(query,(err, res) => {
  console.log('3')

      if (err) {
  console.log('4')

        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created nuevo personal: ");
      result(null, { id: res.insertId, ...criterio });
  console.log('5')

    });
  };

  Personal.getAll = async( result) => {
    await pool.query(`SELECT * FROM aspirante`, (err, res) => {
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
 


 
Personal.findById = async(personalId, result) => { // get por id
  const query =`
    select @filas := @filas + 1 AS nm,
    cargaacademica.idnomenclaturaPeriodo ,
    cargaacademica.semestre,
    materiadocente.materias_idMaterias as idMateria, materiadocente.asignacionGrupo_idgrupo as idGrupos,
    cat_grupo.nomenclatura,
    
    concat(docente.gradoEstudio,' ', docente.nombres,' ',docente.apellidoPaterno,' ',docente.apellidoMaterno)  as nameDocente,docente.clavePersonal, docente.id as id_docente,
    carreras.nombreCorto, carreras.modalidad,
    plan.clavePE as plan,
     materias.clave as clave_materia,materias.nombre, criterios.materias_idmaterias as exis_unidad
    from cargaacademica
    inner join materiadocente  on materiadocente.id = cargaacademica.materiadocente_id 
    inner join asignaciongrupo as grupos on grupos.idgrupo= materiadocente.asignacionGrupo_idgrupo
    inner join cat_grupo on cat_grupo.id = grupos.grupo
    inner join grupospreinscripcion on grupospreinscripcion.idgrupo_asignaciongrupo = grupos.idgrupo
    
    inner join materias on materias.idmaterias = materiadocente.materias_idMaterias
    inner join materias_has_planestudios as materia_plan on materia_plan.materias_idmaterias= materias.idmaterias
    inner join planestudios as plan on plan.idplanEstudios = materia_plan.planEstudios_idplanEstudios
    left join criterios on criterios.materias_idmaterias = materias.idmaterias
    inner join catalogocarreras_has_planestudios as carrera_plan on carrera_plan.planEstudios_idplanEstudios=plan.idplanEstudios
    inner join catalogocarreras as carreras on carreras.idCarrera = carrera_plan.catalogoCarreras_idCarrera
    inner  join personal as docente on docente.id = materiadocente.personal_id 
    JOIN    (SELECT @filas := 0) contador
    where docente.id = '${personalId}'  group by materiadocente.materias_idMaterias 
    ;`; // id es el personal

   await pool.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found personal: ", res[0]);
        result(null, res);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };


  Personal.findTema = async(idDocente,idMateria,periodo,cierre, result) => { // get por id
    const query =`select cargaacademica.folioca as FolioAcade,cargaacademica.idnomenclaturaPeriodo ,
    materiadocente.materias_idMaterias as idMateria,
    criterios.nomUnidad as tema,
    docente.nombres as nameDocente,
    carreras.nombreCorto, carreras.modalidad,
    plan.clavePE as plan,
     materias.clave as clave_materia,materias.nombre
    
    from cargaacademica
    left join materiadocente  on materiadocente.id = cargaacademica.materiadocente_id
    left join materias on materias.idmaterias = materiadocente.materias_idMaterias
    left join criterios on criterios.materias_idmaterias
    left join materias_has_planestudios as materia_plan on materia_plan.materias_idmaterias= materias.idmaterias
    left join planestudios as plan on plan.idplanEstudios = materia_plan.planEstudios_idplanEstudios
    left join catalogocarreras_has_planestudios as carrera_plan on carrera_plan.planEstudios_idplanEstudios=plan.idplanEstudios
    left join catalogocarreras as carreras on carreras.idCarrera = carrera_plan.catalogoCarreras_idCarrera
    left join personal as docente on docente.id = materiadocente.personal_id 
    
    where docente.id="${idDocente}"  and criterios.periodo ="${periodo}" and criterios.fecha_limite <= "${cierre}" and criterios.materias_idmaterias="${idMateria}" group by tema
    ;`; // id es el personal
  
     await pool.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          console.log("found lista de temas: ", res[0]);
          result(null, res);
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