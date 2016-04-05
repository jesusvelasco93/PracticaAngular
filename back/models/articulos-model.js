'use strict';

// Conectar con driver
// Conecctar con la base de datos

require('../lib/connectMongoose');
var mongoose = require('mongoose');

// Creo el esquema
var articuloSchema = mongoose.Schema({
    title: String,
    url_video: String,
    url_imagen: String,
    overview: String,
    rating: Number,
});

articuloSchema.statics.list = function(cb){

    // Preparamos la Query sin ejecutarla (No ponemos callback a find)
    // Hacemos la busqueda con los parametros finales
    var query = Articulo.find({});

    // Añadimos mas parámetros a la query

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