'use strict';

// conectar con driver
// var basedatos = require('../lib/connectMongo');

require('../lib/connectMongoose');
var mongoose = require('mongoose');

// Creo el esquema
var usuarioSchema = mongoose.Schema({
    name: String,
    pass: String
});

usuarioSchema.statics.list = function(cb){
    // Preparamos la Query sin ejecutarla (No ponemos callback a find)
    var query = Usuarios.find({});

    // Añadimos mas parámetros a la query

    // La ejecutamos
    query.exec(function(err, rows){
        if (err){
            console.log("Find", rows);
            cb(err);
            return;
        }
        console.log("Find", rows);
        // console.log(rows);
        cb(null, rows);
    });
};


// Lo registro en mongoose
var Usuarios = mongoose.model('Usuarios', usuarioSchema);