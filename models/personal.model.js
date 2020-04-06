import pool from '../database';
import { request } from 'express';

const Personall = function (personal) {
  this.nombre = personal.nombre;
  this.apellidos = personal.apellidos;
  this.descripcion = personal.descripcion;
}

const Personal = function (criterio) {
  this.id_Materias = criterio.id_Materias;
  this.periodo = criterio.periodo;
  this.grupo_id = criterio.grupo_id;
  this.tema_nombre = criterio.tema_nombre;
  this.fecha_limite = criterio.fecha_limite;
  this.numUnidad = criterio.numUnidad;

  this.criterio1 = criterio.criterio1;
  this.porcentageC1 = criterio.porcentageC1;
  this.criterio2 = criterio.criterio2;
  this.porcentageC2 = criterio.porcentageC2;
  this.criterio3 = criterio.criterio3;
  this.porcentageC3 = criterio.porcentageC3;
}

const Criterios = function (calificacion) {
  this.calR1 = calificacion.calR1;
  this.calR2 = calificacion.calR2;
  this.calR3 = calificacion.calR3;

  this.calCriterio1 = calificacion.calCriterio1;
  this.calCriterio2 = calificacion.calCriterio2;
  this.calCriterio3 = calificacion.calCriterio3;

  this.calificaciontotal = calificacion.calificaciontotal;

  this.unidad = calificacion.unidad;
  this.idGrupoAsign = calificacion.idGrupoAsign ;
  this.materias_idmaterias = calificacion.materias_idmaterias;
  this.materiaDocente_id = calificacion.materiaDocente_id;
  this.criterios_idcat_Unidad = calificacion.criterios_idcat_Unidad;
  this.aspirante_Folio = calificacion.aspirante_Folio ;
  this.registrocal_idcarrera = calificacion.registrocal_idcarrera;
  this.periodocali = calificacion.periodo;
}


Personal.create = async (criterio, result) => {//guardar temas
  const query = `INSERT INTO criterios (numUnidad,nomUnidad, materias_idmaterias, periodo, asingnacion_grupo_id,fecha_limite) VALUES ('${criterio.numUnidad}','${criterio.tema_nombre}', '${criterio.id_Materias}', '${criterio.periodo}', '${criterio.grupo_id}', '${criterio.fecha_limite}');`

  await pool.query(query, (err, res) => {
   

    if (err) {
      
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created nuevo personal: ");
    result(null, { id: res.insertId, ...criterio });
    console.log('5')

  });
};


  Criterios.createRegistocalificacion = async (calificacion, result) => {//guardar calificacion
    console.log("esto es el metodo guardar")
  const query = `INSERT INTO registrocal (calR1, calR2, calR3, calCriterio1, calCriterio2, calCriterio3,calificaciontotal, 
    unidad, idGrupoAsign, materias_idmaterias, materiaDocente_id, criterios_idcat_Unidad,
     aspirante_Folio, periodo)
     VALUES (${calificacion.calR1}, ${calificacion.calR2}, ${calificacion.calR3}, ${calificacion.calCriterio1}, ${calificacion.calCriterio2}, ${calificacion.calCriterio3}, ${calificacion.calificaciontotal}, 
     ${calificacion.unidad}, ${calificacion.idGrupoAsign}, ${calificacion.materias_idmaterias}, ${calificacion.materiaDocente_id}, ${calificacion.criterios_idcat_Unidad},
      ${calificacion.aspirante_Folio},${calificacion.periodocali});
    `;

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



Personal.getAll = async (result) => {
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




Personal.findById = async (personalId, result) => { // get por id
  const query = `
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


Personal.findTema = async (idDocente, idMateria, periodo, cierre, result) => { // get lista de materias
  const query = `select cargaacademica.folioca as FolioAcade,cargaacademica.idnomenclaturaPeriodo ,
    materiadocente.materias_idMaterias as idMateria,
    criterios.nomUnidad as tema,criterios.numUnidad,
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


Personal.findAlumno = async (idMateria, periodo, idDocente, result) => { // get por id
  const query = `
      select cargaacademica.folioca as FolioAcade,cargaacademica.idnomenclaturaPeriodo ,
      concat( alumnos.nombreAspirante, ' ',alumnos.apellidoPaterno,' ',alumnos.apellidoMaterno) as nameAlumno, alumnos.numeroControl as control,alumnos.Folio as folioAspirante,
      registrocal.idcalificaciones,registrocal.calCriterio1,registrocal.calCriterio2, registrocal.calCriterio3, registrocal.calificaciontotal,
      registrocal.calR1, registrocal.calR2,registrocal.calR3, 
      registrocal.curso, registrocal.idGrupoAsign, registrocal.materiaDocente_id,registrocal.materias_idmaterias,
      registrocal.periodo,registrocal.unidad,
      materiadocente.materias_idMaterias as idMateria,materiadocente.id as idMateriaDocente,materiadocente.asignacionGrupo_idgrupo,
      docente.nombres as nameDocente,
      carreras.nombreCorto, carreras.modalidad,
      plan.clavePE as plan,
      materias.clave as clave_materia,materias.nombre
      
      from cargaacademica
      right join aspirante as alumnos on alumnos.Folio = cargaacademica.aspirante_Folio
      left join registrocal on registrocal.aspirante_Folio = alumnos.Folio
      right join materiadocente  on materiadocente.id = cargaacademica.materiadocente_id
      right join materias on materias.idmaterias = materiadocente.materias_idMaterias
      right join criterios on criterios.materias_idmaterias = materias.idmaterias
      right join materias_has_planestudios as materia_plan on materia_plan.materias_idmaterias= materias.idmaterias
      right join planestudios as plan on plan.idplanEstudios = materia_plan.planEstudios_idplanEstudios
      right join catalogocarreras_has_planestudios as carrera_plan on carrera_plan.planEstudios_idplanEstudios=plan.idplanEstudios
      right join catalogocarreras as carreras on carreras.idCarrera = carrera_plan.catalogoCarreras_idCarrera
      right join personal as docente on docente.id = materiadocente.personal_id

      where cargaacademica.idnomenclaturaPeriodo = ${periodo} and materiadocente.materias_idMaterias = ${idMateria} 
      and docente.id =  ${idDocente} and criterios.numUnidad = 1;`; // la unidad esta directa para prubas rapidas

  await pool.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found lista de alumnos: ", res[0]);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


Personal.findCriterio = async (periodo,idMateria,  unidad, result) => { // get por id
  const query = `SELECT * FROM criterios
  where criterios.periodo = ${periodo} and criterios.materias_idmaterias = ${idMateria} and criterios.numUnidad = ${unidad};`; // id es el personal

  await pool.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found lista de alumnos: ", res[0]);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};



Personal.finstadoTema = async (periodo, id_Materia, id_personal, result) => { // get finstadoTema
  const query = `select DATE_FORMAT(criterios.fecha_limite,'%Y-%m-%d') as fecha_limite , criterios.nomUnidad as tema1_nombre  from criterios
  left join materiadocente on materiadocente.materias_idMaterias= criterios.materias_idmaterias
  where criterios.periodo=${periodo} 
  and materiadocente.personal_id=${id_personal} 
  and materiadocente.materias_idMaterias=${id_Materia};`; // id es el personal

  await pool.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found lista de stado temas: ", res[0]);
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};


Personal.updateCriterio = async (periodo, materia,unidad,grupo,criterio ,result) => {
  //"UPDATE users SET nombre = ?, apellidos = ?, descripcion = ? WHERE id = ?",[personal.nombre, personal.apellidos, personal.descripcion, id]
  const query =`
  UPDATE criterios SET criterio1 = '${criterio.criterio1}', porcentageC1 = '${criterio.porcentageC1}', 
  criterio2 = '${criterio.criterio2}', porcentageC2 = '${criterio.porcentageC2}', 
  criterio3 = '${criterio.criterio3}', porcentageC3 = '${criterio.porcentageC3}' 
  
  where criterios.periodo = '${periodo}'
  and criterios.materias_idmaterias = '${materia}' 
  and criterios.numUnidad = ${unidad}
  and criterios.asingnacion_grupo_id= '${grupo}';`;

  await pool.query(query,
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

      console.log("Datos de personal actualizados: ");
      result({status:'ok'});
    }
  );
};



Personal.updateCriterioc1 = async (periodo, materia,unidad,grupo,criterio ,result) => {
  //"UPDATE users SET nombre = ?, apellidos = ?, descripcion = ? WHERE id = ?",[personal.nombre, personal.apellidos, personal.descripcion, id]
  const query =`
  UPDATE criterios SET criterio1 = '${criterio.criterio1}', porcentageC1 ='${criterio.porcentageC1}'
  
  where criterios.periodo = '${periodo}'
  and criterios.materias_idmaterias = '${materia}' 
  and criterios.numUnidad = ${unidad}
  and criterios.asingnacion_grupo_id= '${grupo}';`;

  await pool.query(query,
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

      console.log("Datos de personal actualizados: ");
      result(null,{status:'ok'});
    }
  );
};


Personal.updateCriterioc2 = async (periodo, materia,unidad,grupo,criterio ,result) => {
  //"UPDATE users SET nombre = ?, apellidos = ?, descripcion = ? WHERE id = ?",[personal.nombre, personal.apellidos, personal.descripcion, id]
  const query =`
  UPDATE criterios SET criterio2 = '${criterio.criterio2}', porcentageC2 = ${criterio.porcentageC2}
  
  where criterios.periodo = '${periodo}'
  and criterios.materias_idmaterias = '${materia}' 
  and criterios.numUnidad = ${unidad}
  and criterios.asingnacion_grupo_id= '${grupo}';`;

  await pool.query(query,
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

      console.log("Datos de personal actualizados: ");
      result(null,{status:'ok'});
    }
  );
};



Personal.updateCriterioc3 = async (periodo, materia,unidad,grupo,criterio ,result) => {
  //"UPDATE users SET nombre = ?, apellidos = ?, descripcion = ? WHERE id = ?",[personal.nombre, personal.apellidos, personal.descripcion, id]
  const query =`
  UPDATE criterios SET criterio3 = '${criterio.criterio3}', porcentageC3 = ${criterio.porcentageC3}
  
  where criterios.periodo = '${periodo}'
  and criterios.materias_idmaterias = '${materia}' 
  and criterios.numUnidad = ${unidad}
  and criterios.asingnacion_grupo_id= '${grupo}';`;

  await pool.query(query,
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

      console.log("Datos de personal actualizados: ");
      result(null,{status:'ok'});
    }
  );
};





Criterios.updateCalificacion = async (idCalificacion,calificacion ,result) => {
  //"UPDATE users SET nombre = ?, apellidos = ?, descripcion = ? WHERE id = ?",[personal.nombre, personal.apellidos, personal.descripcion, id]
  const query =`UPDATE registrocal SET calR1 = '${calificacion.calR1}', calR2 = '${calificacion.calR2}', calR3 = '${calificacion.calR3}',
  calCriterio1 = '${calificacion.calCriterio1}', calCriterio2 = '${calificacion.calCriterio2}', calCriterio3 = '${calificacion.calCriterio3}', 
  calificaciontotal = '${calificacion.calificaciontotal}'
  WHERE (idcalificaciones = '${idCalificacion}');`;

  await pool.query(query,
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

      console.log("Datos de personal actualizados: ");
      result(null,{status:'ok'});
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


module.exports = {Personal , Criterios};