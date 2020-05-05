import jwt from 'jsonwebtoken';
import pool from '../database';
import { request } from 'express';

async function checkToken(token){//inicio
    console.log("chacando el tokennn")
    let __id = null;
    try {
        const {_id} = await jwt.decode(token);
        console.log(_id)
        __id=_id;
      
    } catch (e) {
        return false;
    }
//---
return new Promise((resolve,reject) =>{
    pool.query('SELECT * FROM usuariospersonal inner join rolusuario on rolusuario.id=usuariospersonal.RolUsuario_id where usuariospersonal.idusuariosPer = ?',[ __id ],(err, resul) =>{
        if(resul.length>0){
            console.log("generando el tokennn")
                 const token = jwt.sign({_id:__id},'tec',{expiresIn:'1m'})
                console.log(resolve(resul[0].nombreRol, token))
                // resolve(resul[0].nombreRol, token)//roll
                }else{
                    return false
                }
    })//fin pooll

})


    //-----

   /* pool.query('SELECT * FROM usuariospersonal inner join rolusuario on rolusuario.id=usuariospersonal.RolUsuario_id where usuariospersonal.idusuariosPer = ?',[ __id ],(err, resul, fields) => {
        if(resul.length>0){
    console.log("generando el tokennn")

         const token = jwt.sign({_id:__id},'tec',{expiresIn:'1m'}).then(res =>{console.log("listo")})
            return {resul, token}//roll
        }else{
            return false
        }
     })//fin pool*/
}//fin


export default {
    
    encode: async (_id) =>{
        const token =  jwt.sign({_id:_id},'tec',{expiresIn:'1m'})
        return token;
    },


    decode:async (token) =>{//inicia
        try {
            console.log("en el DECODE")
            const {_id} = await jwt.verify(token,'tec')
            console.log("ver id : ###" + _id)

         const user = new Promise((resolve,reject) =>{
                pool.query('SELECT * FROM usuariospersonal inner join rolusuario on rolusuario.id=usuariospersonal.RolUsuario_id where usuariospersonal.idusuariosPer = ?',[ _id ],(err, resul) =>{
                    if(err) reject(err)
                        resolve(resul[0].nombreRol)

                        console.log("pool")
                })//fin pooll
            });
            console.log(user)
            if(user){
                return user;
            }else{
                return false
            }


        } catch (error) {
            const newToken = await checkToken(token);
            return newToken;
        }
    }//fin

}

