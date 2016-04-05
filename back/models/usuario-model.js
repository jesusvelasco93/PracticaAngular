'use strict';

// conectar con driver
// var basedatos = require('../lib/connectMongo');

require('../lib/connectMongoose');
var mongoose = require('mongoose');

// Creo el esquema
var usuarioSchema = mongoose.Schema({
    name: String,
    email: String,
    pass: String
});

usuarioSchema.statics.list = function(cb){
    // Preparamos la Query sin ejecutarla (No ponemos callback a find)
    var query = Usuarios.find({});

    // Añadimos mas parámetros a la query

    // La ejecutamos
    query.exec(function(err, rows){
        if (err){
            cb(err);
            return;
        }
/*        var users = {};
        for (var i in rows){
            console.log(i, rows[i].name);
            users += {
                [i]: rows[i].name
            };
        }*/
        console.log(users);
        cb(null, users);
    });
};

usuarioSchema.statics.delete = function(name, cb){
    // Preparamos la Query sin ejecutarla (No ponemos callback a find)
    var userName = name.toLowerCase().toString();
    var query = Usuarios.remove({"name": userName});

    // Añadimos mas parámetros a la query

    // La ejecutamos
    query.exec(function(err, rows){
        if (err){
            cb(err);
            return;
        }
        cb(null, rows);
    });
};


// Lo registro en mongoose
var Usuarios = mongoose.model('Usuarios', usuarioSchema);