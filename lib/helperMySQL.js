var mysql = require('mysql');

//Declaracion de variable global de conexión
var con = mysql.createConnection({
        //192.168.13.42
    host: "127.0.0.1",
    user: "alumno",
    password: "alumno",
    database: "encuestas"
  });;

//Funcion para conectar a la base de datos
function conectar(callCon){    
    con = mysql.createConnection({
        host: "127.0.0.1",
        user: "alumno",
        password: "alumno",
        database: "encuestas"
      });

    con.connect(callCon);
}

//Para fines de pruebas de conexión
function probarConexion(){
    console.log("Probando conexion....");    
    conectar(function(err){
        if(err)
            console.log("Error de prueba de conexion");
            else
            console.log("La prueba de conexion fue un exito!");
    });
    con.end();
}
exports.guardar = function (entidad,datos,callFunc){
    conectar(function(err){

        var sql = "insert into ?? values(";
        for(var i=0;i<datos.length;i++)
        {
            if(i==0)
                sql+="?";
            else
                sql+=",?";
        }
        sql+=")";
        
        datos.unshift(entidad);
        con.query(sql, datos,callFunc);
        con.end();
    });    
}





//Permite guardar una encuesta
function guardarEncuesta(idEncuesta,titulo,alcance,fechaRealizacion,fechaApertura,fechaCierre,callFunc){
conectar(function(err){
    var sql = "insert into encuesta values(?,?,?,?,?,?)";
    con.query(sql, [idEncuesta,titulo,alcance,fechaRealizacion,fechaApertura,fechaCierre],
        callFunc
        );
    con.end();
});    
}

//Permite actualizar los datos de una encuestra previamente guardada
exports.guardarCambiosEncuesta= function (idEncuesta,titulo,alcance,fechaRealizacion,fechaApertura,fechaCierre,callFunc){
    conectar(function(err){
        var sql = "update encuesta set titulo=?,alcance=?,fechaRealizacion=?,fechaApertura=?,fechaCierre=? where idEncuesta=?";
        con.query(sql, [titulo,alcance,fechaRealizacion,fechaApertura,fechaCierre,idEncuesta],
            callFunc);
        con.end();
    });    
    }

exports.eliminarEncuesta = function(idEncuesta,callFunc){
    conectar(function(err){
        var sql = "delete from encuesta where idEncuesta=?";
        con.query(sql, [idEncuesta],callFunc);
        con.end();
    }); 
}

//Permite encontrar una encuesta en particular
exports.getEncuesta = function (idEncuesta,callRes){        
    conectar(
        function(err) {
            if (err) 
                console.log("Problemas de conexion: ");        
            else{                
                var sql = "select * from encuesta where idEncuesta = ?";                
                con.query(sql,[idEncuesta],callRes);    
                con.end();                
            }              
            }
    );      
}

//Función para obtener todas las encuestas
exports.consultarEncuestas = function (callRes){        
    conectar(
        function(err) {
            if (err) 
                console.log("Problemas de conexion: ");        
            else{                
                var sql = "select * from encuesta";
                con.query(sql,callRes);    
                con.end();                
            }              
            }
    );      
}

//Exportación de funciones para otros archivos
exports.probarConexion = probarConexion;
exports.guardarEncuesta = guardarEncuesta;
exports.conectar = conectar;