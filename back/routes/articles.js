'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Articulos');

// Get Articles listing
router.get('/', function(req, res) {

    var parametros = {
        title: req.query.title || ''
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

    var art = {
        title: req.body.title || '',
        url_video: req.body.url_video || '',
        url_imagen: req.body.url_imagen || '',
        overview: req.body.overview || '',
        date_created: new Date()
    };

    if (art.title !== '' && art.overview !== '') {
        //Comprobamos que no haya ninguno repetido
        Article.findOne({ title: new RegExp('^' + art.title + '$', 'i') }, function(err, row) {

            // Si no ha encontrado ninguno 
            if (!row) {

                // Instaciamos objeto en memoria
                var article = new Article(art);

                // Verificamos que no hay campos vacios

                console.log(article.url_video, article.url_imagen);
                console.log(article.date_created);

                // Lo guardamos en la Base de Datos
                article.save(function(err, newRow) {
                    if (err) {
                        res.json({ result: false, err: err });
                        return;
                    }
                    res.json({ result: true, row: newRow });
                });

            } else {
                res.json({ result: false, err: 'Articulo ya existente' });
            }
        });
    } else {
        console.log(art.title, art.overview);
        res.json({ result: false, err: 'Campos Vacios' });
    }
});

router.put('/', function(req, res){
    var art = {
        title: req.body.title || '',
        url_video: req.body.url_video || '',
        url_imagen: req.body.url_imagen || '',
        overview: req.body.overview || '',
    };
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
