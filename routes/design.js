var express = require('express');
var router = express.Router();
var conexion = require('../lib/helperMySQL');

function getOpciones(idEncuesta,nPregunta){
  conexion.consultaOpciones(idEncuesta,nPregunta,function(err,res,fields){
    if(err){
      console.log("Error al consultar Preguntas.");      
    }
    else
      return res;
  });    
}


router.get('/', function(req, response, next) {    

  var ide = req.query.e;

  conexion.consultaPreguntas(ide,function(err,res,fields){
    if(err){
      console.log("Error al consultar Preguntas.");      
    }
    else{
      conexion.consultaOpciones(ide,function(err,resOpc,fields){
        if(err){
          console.log("Error al consultar Preguntas.");      
        }
        else
         response.render('design',{title:'Diseño de encuesta',preguntas:res,idEncuesta:ide,opciones:resOpc});
      });
    }
      
  });  
  

});






  router.post('/guardarPregunta',function(req,response,next){

    conexion.getNum('pregunta','idEncuesta',req.body.idEncuesta,'nPregunta',function(err,res,fields){
      if(err)
        console.log("Error: Al obtener NUM consecutivo = " + err);
        else
        {             
          conexion.guardar('pregunta',
                  [ res.length<=0 ? 0 : res[0].nPregunta+1,req.body.idEncuesta,
                    req.body.pregunta,      
                  ],function(err){
                    if(err)
                      console.log("Error: Al guardar = " + err);
                    else
                      response.redirect('/design?e='+req.body.idEncuesta);
            });       
        }
    });    
    

    
  
  }); 

  router.post('/editarPregunta',function(req,response,next){
          conexion.guardarCambiosPregunta(
                  req.body.nPregunta,req.body.idEncuesta,
                    req.body.pregunta,      
                  function(err){
                    if(err)
                      console.log("Error: Al actualizar pregunta = " + err);
                    else
                      response.redirect('/design?e='+req.body.idEncuesta);
            });             
  }); 


  router.post('/guardarOpcion',function(req,response,next){

    conexion.getNumOpcion(req.body.idEncuesta,req.body.nPregunta,function(err,res,fields){
      if(err)
        console.log("Error: Al obtener NUM consecutivo = " + err);
        else
        {             
          conexion.guardar('opcion',
                  [ res.length<=0 ? 0 : res[0].nPregunta+1, req.body.nPregunta, req.body.idEncuesta,
                    req.body.opcion,      
                  ],function(err){
                    if(err)
                      console.log("Error: Al guardar = " + err);
                    else
                      response.redirect('/design?e='+req.body.idEncuesta);
            });       
        }
    });    
  });
  
  router.post('/editarOpcion',function(req,response,next){
    conexion.guardarCambiosOpcion(
            req.body.nPregunta,req.body.idEncuesta,req.body.nOpcion,
              req.body.opcion,      
            function(err){
              if(err)
                console.log("Error: Al actualizar Opcion = " + err);
              else
                response.redirect('/design?e='+req.body.idEncuesta);
      });             
}); 

router.post('/borrarPregunta',function(req,response,next){
  conexion.eliminarPregunta(
          req.body.idEncuesta,req.body.nPregunta,                
          function(err){
            if(err)
              console.log("Error: Al borrar pregunta = " + err);
            else
              response.redirect('/design?e='+req.body.idEncuesta);
    });             
}); 

router.post('/borrarOpcion',function(req,response,next){
  conexion.eliminarOpcion(
          req.body.idEncuesta,req.body.nPregunta, req.body.nOpcion,               
          function(err){
            if(err)
              console.log("Error: Al borrar opcion = " + err);
            else
              response.redirect('/design?e='+req.body.idEncuesta);
    });             
}); 

  
  
module.exports = router;