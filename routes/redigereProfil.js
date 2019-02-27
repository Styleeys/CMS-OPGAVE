//TODO: 
const db = require('../config/mysql')();
var session = require('express-session');
const express = require('express');
const app = express();
const fs = require('fs');


app.use(session({ secret: 'hahaha', resave: false, saveUninitialized: false, cookie: { maxAge: '60000' } }));

module.exports = function (app) {

    app.get('/redigere/profil', (req, res) => {
        db.query(`SELECT id FROM users`, [req.session.user_id], (err) => {
            if (err) {
                res.send('');
                console.log('fejl:' + err);
            } else
                res.render('redigereProfil');
        });
    });

    app.post('/user/profil', (req, res, next) => {
        console.log('user id:' + req.session.user_id);

        db.query(`SELECT * FROM profiles WHERE user_id = ?`,
            [req.session.user_id], (err, result) => {
                if (err) {
                    res.send('');
                    console.log('fejl:' + err);
                } else {
                    console.log(result.length);
                    if (result.length == 0) { //Hvis ingen profil
                        console.log('ingen profil');
                        db.query(`INSERT INTO profiles (firstname, lastname, bio, picture, user_id) VALUES (?, ?, ?, ?, ?)`,
                            [req.fields.firstname, req.fields.lastname, req.fields.bio, newFilename, req.session.user_id], (err, results) => {
                                if (err) {
                                    res.send('');
                                    console.log('fejl:' + err);
                                } else
                                    res.redirect('/profil');
                            });

                    } else if (result.length == 1) {
                        let time = Date.now();
                        let originalFilename = req.files.image.name;
                        let newFilename = time + '_' + originalFilename;
                        
                        console.log('En tilhørende profil'); //har allerede profil
                        console.log();
                        db.query(`UPDATE profiles SET firstname = ?, lastname = ?, bio = ?, picture = ? WHERE user_id = ?`,
                            [req.fields.firstname, req.fields.lastname, req.fields.bio, newFilename, req.session.user_id], (err, results) => {
                                if (err) {
                                    res.send('');
                                    console.log('fejl:' + err);
                                } else {
                                    if(fs.existsSync(req.files.image.path)) {
                                        
                                        fs.rename(req.files.image.path, 'public/img/' + newFilename, function (err) {
                                            if(err)
                                            console.log(err);
                                            res.redirect('/profil');
                                        });
                                    }
                                }
                            });
                    } else { //brugeren har flere profiler (FEJL)
                        console.log('Brugeren har flere profiler (FEJL)');
                        res.send('');
                    }
                }
            });
    });
}