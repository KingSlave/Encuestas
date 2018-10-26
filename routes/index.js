var express = require('express');
var router = express.Router();
var conexion = require('../lib/helperMySQL');

function formatoFecha(fecha){  
  var f = new Date(fecha);
  var d = f.getDate();
  var meses = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Deciembre" ];
  var m = meses[f.getMonth()];
  var a = f.getFullYear();
  return d+' '+m+' '+a;
}

function extraerFecha(cadenaFecha){
  var f = new Date(cadenaFecha);
  var d = f.getDate();  
  var m = f.getMonth()+1;
  if(m<10)
    m="0"+m;
  if(d<10)
    d="0"+d;
  var a = f.getFullYear();
  return a+'-'+m+'-'+d;
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

router.post('/guardarCambiosEncuesta',function(req,response,next){
  conexion.guardarCambiosEncuesta(
  req.body.idEncuesta,
    req.body.titulo,
    req.body.alcance,
    req.body.fechaRealizacion,
    req.body.fechaApertura,
    req.body.fechaCierre
  ,function(err){
    if(err)
      console.log("Error: Al guardar cambios " + err);
    else
      response.redirect('/');
  });       
});

router.post('/eliminarEncuesta',function(req,response,next){
  conexion.eliminarEncuesta(
  req.body.idEncuesta,    
  function(err){
    if(err)
      console.log("Error: Al eliminar encuesta " + err);
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
        response.render('index',{title:'Encuestas',encuestas:res,formatoFecha: formatoFecha,extraerFecha:extraerFecha});

  });
  
  
  // response.render('index', { title: 'Encuestas' });
});



module.exports = router;
