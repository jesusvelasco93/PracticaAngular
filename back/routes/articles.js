'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Articulos');

// Get Articles listing
router.get('/', function(req, res) {

    var parametros = {
        id: req.query.id || '',
        sort: {
            'date_created':-1
        }
    };
    // Llamamos a la busqueda con estos parametros y se lo devolvemos o renderizamos a la vista
    Article.list(parametros, function(err, articles) {

        if (err) {
            res.json({ err: err });
            return;
        }

        // res.json({ result: true, Articles: rows });
        res.json({ articles: articles });
    });
});


router.post('/', function(req, res) {
    console.log(req.body);

    var art = {
        title: req.body.title || '',
        url_video: req.body.url_video || '',
        url_imagen: req.body.url_imagen || '',
        overview: req.body.overview || '',
        user_created: req.body.user_created || '',
        date_created: new Date()
    };

    // Verificamos que no hay campos vacios
    if (art.title !== '' && art.overview !== '') {
        //Comprobamos que no haya ninguno repetido
        Article.findOne({ title: new RegExp('^' + art.title + '$', 'i') }, function(err, row) {

            // Si no ha encontrado ninguno 
            if (!row) {

                // Instaciamos objeto en memoria
                var article = new Article(art);

                // Lo guardamos en la Base de Datos
                article.save(function(err, newRow) {
                    if (err) {
                        res.json({ result: false, err: err });
                        return;
                    }
                    res.json({ result: true, row: newRow });
                });

            } else {
                res.json({ result: false, err: 'Title busy. Please select other.' });
            }
        });
    } else {
        res.json({ result: false, err: 'Empty fields.' });
    }
});

router.put('/', function(req, res){
    var art = {
        title: req.body.title || '',
        url_video: req.body.url_video || '',
        url_imagen: req.body.url_imagen || '',
        overview: req.body.overview || '',
    };

    // Verificamos que no hay campos vacios
    if (art.title !== '' && art.overview !== '') {

        Article.update({title: req.query.title}, { $set: art}, function(err, data){
            if (err) {
                res.json({ result: false, err: err });
                return;
            }
            res.json({ result: true, data: data });  
        });
    }
    else{
        res.json({ result: false, err: "Campos vacios" });  
    }
});

router.delete('/', function(req, res) {

    Article.remove({"title": req.body.title}, function(err, check) {
        if (err) {
            res.json({err: err });
            return;
        }
        res.json({ check: check });
    });
});

module.exports = router;
