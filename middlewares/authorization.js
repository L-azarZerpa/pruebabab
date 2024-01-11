let jsonwebtoken = require('jsonwebtoken') 
let dotenv = require('dotenv')
var method = require('../controllers/authentication.controller'); 

let usuarios = method.usuarios

dotenv.config();

function soloAdmin(req,res,next){
  const logueado = revisarCookie(req);
  if(logueado) return next();
   return res.redirect("/")
 }

function soloPublico(req,res,next){
   const logueado = revisarCookie(req);
   if(!logueado) return next();
   return res.redirect("/pago")
 }


 function revisarCookie(req){
   try{
     const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt=")).slice(4);
     const decodificada = jsonwebtoken.verify(cookieJWT,process.env.JWT_SECRET);
     console.log(decodificada)
     const usuarioAResvisar = usuarios.find(usuario => usuario.user === decodificada.user);
     console.log(usuarioAResvisar)
     if(!usuarioAResvisar){
       return false
     }
     return true;
   }
   catch{
     return false;
   }
 }
  
  
module.exports = {
    soloAdmin:soloAdmin,
    soloPublico:soloPublico,
}