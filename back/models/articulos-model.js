'use strict';

// Conectar con driver
// Conecctar con la base de datos

require('../lib/connectMongoose');
var mongoose = require('mongoose');

// Creo el esquema
var articuloSchema = mongoose.Schema({
    title: String,
    user_created: String,
    date_created: Date,
    url_video: String,
    url_imagen: String,
    overview: String,
});

articuloSchema.statics.list = function(parametros, cb){

    // Creamos un objeto para añadir los parametros a la busqueda
    var criteria = {};

    // Añadimos los parametros que nos han mandado
    // Parametro title
    if (parametros.id !== ""){
        criteria = {
            _id: parametros.id
        };
    }
    

    // Preparamos la Query sin ejecutarla (No ponemos callback a find)
    // Hacemos la busqueda con los parametros finales
    var query = Articulo.find(criteria);

    // Añadimos mas parámetros a la query
    query.sort(parametros.sort);
    query.skip(parametros.skip*parametros.limit);
    query.limit(parametros.limit);

    // La ejecutamos
    query.exec(function(err, articles) {

        // Devolvemos error
        if (err) {
            cb(err);
            return;
        }
        // var numElemMostrados = rows.length;

        // O devolvemos los resultados
        cb(null, articles);
    });
};

articuloSchema.statics.item = function(title, cb){

    // Preparamos la Query sin ejecutarla (No ponemos callback a find)
    var query = Articulo.find({"title": title});

    // La ejecutamos
    query.exec(function(err, article){

        // Devolvemos error
        if (err){
            cb(err);
            return;
        }

        // Devolvemos los resultados
        cb(null, article);
    });
};

// Lo registro en mongoose
var Articulo = mongoose.model('Articulos', articuloSchema);