'use strict';

var sha = require('sha256');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuarios');

router.get('/all', function(req, res) {

    Usuario.list(function(err, users) {

        if (err) {
            res.json({ err: err });
            return;
        }
        // res.json({ result: true, Articles: rows });
        res.json({ Users: users });
    });
});

router.post('/', function(req, res) {
    var userName = req.body.name.toLowerCase() || "";
    var userPass = sha(req.body.pass) || "";
    if (userPass !== "" && userName !== "") {
        Usuario.findOne({ name: userName, pass: userPass }, function(err, user) {
            if (err) {
                res.json({ err: err });
                return;
            }
            if (user != null){
                res.json({ usuario: user.name });
            }
            else{
                res.json({err: "Combinacion de usuario y contraseña no coinciden" });
            }
        });
    }
    else{
        res.json({err: "Campos vacios" })
    }
});

router.post('/new', function(req, res) {
    // Comprobamos que los campos no esten vacios
    if (!req.body.name == false && !req.body.pass == false && !req.body.email == false) {

        var user = {};
        // Buscamos algun usuario con el nombre que nos han pasado
        Usuario.findOne({ name: req.body.name.toLowerCase() }, function(err, row) {

            if (err) {
                res.json({ result: false, err: err });
                return;
            }
            // Si no encontramos..
            if (!row) {

                //Buscamos algun usuario con el email que nos han pasado
                Usuario.findOne({ email: req.body.email }, function(err, rowEmail) {
                    if (err) {
                        res.json({ result: false, err: err });
                    }

                    // Si no lo encontramos
                    if (!rowEmail) {
                        if (err) {
                            res.json({ result: false, err: err });
                        }
                        user = {
                            name: req.body.name.toLowerCase() || '',
                            pass: sha(req.body.pass) || '',
                            email: req.body.email || ''
                        };
                        if (user.name !== '' && user.pass !== '' && user.email !== '') {
                            var usuario = new Usuario(user);
                            usuario.save(function(err, newRow) {
                                if (err) {
                                    res.json({ result: false, err: err });
                                    return;
                                }
                                res.json({ result: true, name: newRow.name, clave: '******', email: newRow.email });
                            });
                        } else {
                            res.json({ result: false, err: 'Rellene todos los campos' });
                        }
                    } else {
                        res.json({ result: false, err: 'Email ya registrado' });
                    }
                });
            } else {
                res.json({ result: false, err: 'Usuario ya existente' });
            }
        });
    } else {
        res.json({ result: false, err: 'Faltan campos' });
    }
});


// router.delete('/', function(req, res) {
//     Usuario.delete(req.body.name, function(err, check) {
//         if (err) {
//             res.json({ usuarios: "", err: err });
//             return;
//         }
//         res.json({ check: check });
//     });
// });

module.exports = router;
