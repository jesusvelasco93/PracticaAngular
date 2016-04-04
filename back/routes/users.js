'use strict';

//var sha = require('sha256');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuarios');

router.get('/', function(req, res) {
    Usuario.list(function(err, users) {
        console.log(users);
        if (err) {
            res.json({ usuarios: "", err: err });
            return;
        }

        // res.json({ result: true, anuncios: tags });
        res.json({ usuarios: users });
    });
});

router.post('/', function(req, res) {

    var user = {
        name: req.body.name.toLowerCase() || '',
        pass: req.body.pass || ''
    };
    console.log("name:",user.name, "req", req.body)
    if (user.name !== '' && user.pass !== '') {
        var usuario = new Usuario(user);
        usuario.save(function(err, newRow) {
            if (err) {
                res.json({ result: false, err: err });
                return;
            }
            res.json({ result: true, nombre: newRow.nombre, clave: newRow.clave});
        });
    } else {
        res.json({ result: false, err: 'Rellene todos los campos' });
    }

});

module.exports = router;
