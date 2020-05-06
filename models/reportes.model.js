import pool from '../database';
import { request } from 'express';
import token from '../services/token';
var crypto = require('crypto');

const Reportes = function(reporte) {
	
};

Reportes.getParcial = async (periodo, idMateria, idPersonal, grupo, result) => {
	const query = `
SELECT concat(aspirante.apellidoPaterno,' ',aspirante.apellidoMaterno,' ' ,aspirante.nombreAspirante) as nombreAspirante, aspirante.numeroControl, materiadocente.materias_idMaterias,
group_concat( if(registrocal.unidad = 1,registrocal.calificaciontotal,'') separator '') as tema1,
group_concat(if(registrocal.unidad = 2,registrocal.calificaciontotal,'') separator '' )as tema2,
group_concat( if(registrocal.unidad = 3,registrocal.calificaciontotal,'') separator '') as tema3,
group_concat(if(registrocal.unidad = 4,registrocal.calificaciontotal,'') separator '' )as tema4,
group_concat(if(registrocal.unidad = 5,registrocal.calificaciontotal,'') separator '' )as tema5,
group_concat( if(registrocal.unidad = 6,registrocal.calificaciontotal,'') separator '') as tema6,
group_concat(if(registrocal.unidad = 7,registrocal.calificaciontotal,'') separator '' )as tema7,
group_concat( if(registrocal.unidad =8,registrocal.calificaciontotal,'') separator '') as tema8,
group_concat(if(registrocal.unidad = 9,registrocal.calificaciontotal,'') separator '' )as tema9,
group_concat(if(registrocal.unidad = 10,registrocal.calificaciontotal,'') separator '' )as tema10,
group_concat( if(registrocal.unidad = 1,registrocal.opcion,'') separator '') as opcion1,
group_concat( if(registrocal.unidad = 2,registrocal.opcion,'') separator '') as opcion2,
group_concat( if(registrocal.unidad = 3,registrocal.opcion,'') separator '') as opcion3,
group_concat( if(registrocal.unidad = 4,registrocal.opcion,'') separator '') as opcion4,
group_concat( if(registrocal.unidad = 5,registrocal.opcion,'') separator '') as opcion5,
group_concat( if(registrocal.unidad = 6,registrocal.opcion,'') separator '') as opcion6,
group_concat( if(registrocal.unidad = 7,registrocal.opcion,'') separator '') as opcion7,
group_concat( if(registrocal.unidad = 8,registrocal.opcion,'') separator '') as opcion8,
group_concat( if(registrocal.unidad = 9,registrocal.opcion,'') separator '') as opcion9,
group_concat( if(registrocal.unidad = 10,registrocal.opcion,'') separator '') as opcion10
FROM cargaacademica
inner join aspirante on aspirante.Folio = cargaacademica.aspirante_Folio
inner join registrocal on registrocal.aspirante_Folio=aspirante.Folio
inner join materiadocente on materiadocente.id = cargaacademica.materiadocente_id
inner join criterios on criterios.idcat_Unidad = registrocal.criterios_idcat_Unidad

where registrocal.periodo=${periodo} 
and materiadocente.materias_idMaterias=${idMateria} 
and registrocal.materias_idmaterias=${idMateria}
and registrocal.idGrupoAsign=${grupo}
and materiadocente.personal_id=${idPersonal} 
group by registrocal.aspirante_Folio;`;

	await pool.query(query, (err, res) => {
		if (err) {
			console.log('error: ', err);
			result(err, null);
			return;
		}
		if (res.length) {
			result(null, res);
			return;
		}
		result({ kind: 'not_found' }, null);
	});
};

Reportes.logeo = async (usuario, password, res) => {
	// get por id
	await pool.query(
		`
   SELECT usuariospersonal.idusuariosPer, usuariospersonal.alias,usuariospersonal.password,
   rolusuario.nombreRol,
   personal.id as usuarioID
   FROM usuariospersonal
   inner join rolusuario on rolusuario.id=usuariospersonal.RolUsuario_id
   inner join personal on personal.clavePersonal = usuariospersonal.clavePersonal
   where usuariospersonal.alias = '${usuario}'`,
		(err, resul, fields) => {
			var im = crypto.createHash('md5').update(password).digest('hex');

			if (resul.length > 0) {
				let pass = resul[0].password;
				let npass = `04${im}2wA`;
				let id = resul[0].idusuariosPer;
				console.log(npass);
				if (pass === npass) {
					let tokenReturn = token.encode(id).then((ress) => res(null, { resul, token: ress }));
					console.log('contraseñas correctas' + id);
				} else {
					console.log('contraseña incorrecta');
					res(null);
				}
			}
		}
	);
};

module.exports = { Reportes };
