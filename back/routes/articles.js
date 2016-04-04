'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncios');

// Get anuncios listing
router.get('/', function(req, res) {

    title = req.header.title || "";
    if (title == "") {
        // Llamamos a la busqueda con estos parametros y se lo devolvemos o renderizamos a la vista
        Anuncio.list(function(err, articles) {

            if (err) {
                res.json({ anuncios: "", err: err });
                return;
            }

            // res.json({ result: true, anuncios: rows });
            res.json({ anuncios: articles, err: "" });
        });
    }
    else {
        Anuncio.item(title, function(err, article) {

            if (err) {
                res.json({ anuncio: "", err: err });
                return;
            }

            // res.json({ result: true, anuncios: rows });
            res.json({ anuncio: artcicle, err: "" });
        });
    }
});


router.post('/new', function(req, res) {
  // FALTA HACER POST
});

module.exports = router;
