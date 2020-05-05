import tokenService from '../../services/token'

export default {
    varifyUsuario:async (req, res, next)=>{
        if(!req.headers.token){
            return res.status(404).send({
                message:'No token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        if(response[0].nombreRol === 'Docente' || response[0].nombreRol ==="Administrador" ){
            next();
        }else{
            return res.status(403).send({
                message:'No autorizado'
            });
        }
    },
    verifyAdministrador: async (req,res,next)=>{
        if(!req.headers.token){
            return res.status(404).send({
                message:'No token'
            });
        }
        const response = await tokenService.decode(req.headers.token);
        console.log(response)
        if(response =="Administrador" || response =="Docente" ){
            next();
        }else{
            return res.status(403).send({
                message:'No autorizado'
            });
        }
    },
    verifyDocente: async (req,res,next)=>{
        console.log(req.headers.token)
        if(!req.headers.token){
            return res.status(404).send({
                message:'No token'
            });
        }
        console.log("iniciando decode auth")
        const response = await tokenService.decode(req.headers.token);
        console.log(response + " auth")
        if(response =="Docente" ){
            next();
        }else{
            return res.status(403).send({
                message:'No autorizado Docente'
            });
        }
    }
}