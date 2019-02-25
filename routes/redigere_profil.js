//TODO: 
const db = require('../config/mysql')();
var session = require('express-session');
const express = require('express');
const app = express();

app.use(session({ secret: 'hahaha', resave: false, saveUninitialized: false, cookie: { maxAge: '60000' } }));

module.exports = function (app) {

    app.get('/redigere/profil', (req, res) => {
        db.query(`SELECT id FROM users`, [req.session.user], (err, result) => {
            if (err) {
                return err;
            } else
                res.render('redigere_profil');
                console.log(result);
                
            });
        });
        
        app.post('/user/profil', (req, res, next) => {
        db.query(`INSERT INTO profiles (firstname, lastname, bio) VALUES (?, ?, ?) WHERE users.users_id LIKE profiles.users_id`, [req.fields.firstname, req.fields.lastname, req.fields.bio], (err, result) => {
            if (err) {
                return err;
            } else
            req.session.user = result[0].id;
                res.render('profile');
               
                
        });
    });
    //     app.post('/user/profil', (req, res, next) => {
    //     db.query(`INSERT INTO profiles (firstname, lastname, bio) VALUES (?, ?, ?) WHERE users_id =1 `, [req.fields.firstname, req.fields.lastname, req.fields.bio], (err, result) => {
    //         if (err) {
    //             return err;
    //         } else
    //             res.render('profile');
    //     });
    // });
}


    // app.patch('/user/profil', (req, res, next) => {
    //     db.query(`UPDATE profiles SET firstname = ?, lastname = ?, bio = ? WHERE users_id = 1;`, [req.fields.firstname, req.fields.lastname, req.fields.bio], (err, result) => {
    //         if (err) return next(`${err} at db.query (${__filename}:15:5)`);
    //         res.render('profile', { user: result[0] });

    //     });
    // });