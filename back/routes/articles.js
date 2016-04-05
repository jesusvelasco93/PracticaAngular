'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Articulos');

// Get Articles listing
router.get('/', function(req, res) {

    // NO FUNCIONA BIEN LA DIFERENCIACION
    var title = req.header.title || "";
    if (title == "") {
        // Llamamos a la busqueda con estos parametros y se lo devolvemos o renderizamos a la vista
        Article.list(function(err, articles) {

            if (err) {
                res.json({ articles: "", err: err });
                return;
            }

            // res.json({ result: true, Articles: rows });
            res.json({ articles: articles, err: "" });
        });
    }
    else {
        Article.item(title, function(err, article) {

            if (err) {
                res.json({ article: "", err: err });
                return;
            }

            // res.json({ result: true, Articles: rows });
            res.json({ article: artcicle, err: "" });
        });
    }
});


router.post('/new', function(req, res) {
  // FALTA HACER POST
});

module.exports = router;
