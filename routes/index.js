var express = require('express');
var router = express.Router();
var conexion = require('../lib/helperMySQL');

function metodo(err){
  if(err)
    console.log('Error al conectar');
  else
    console.log('Conexion exitosa');
}
//req.body.variable  para leer lo recibido de un post
//req.param.variable para leer lo recibido de un get
router.post('/guardarEncuesta',function(req,response,next){
  conexion.guardar('encuesta',
  [req.body.idEncuesta,
    req.body.titulo,
    req.body.alcance,
    req.body.fechaRealizacion,
    req.body.fechaApertura,
    req.body.fechaCierre
  ],function(err){
    if(err)
      console.log("Error: Al guardar");
    else
      response.redirect('/');
  }); 
  
  
  
});
/* GET home page. */
router.get('/', function(req, response, next) {

  conexion.consultarEncuestas(function(err,res,fields){
      if(err)
        console.log("Error al consultar encuestas.");
      else
        response.render('index',{title:'Encuestas',encuestas:res});

  });
  
  
  // response.render('index', { title: 'Encuestas' });
});



module.exports = router;
