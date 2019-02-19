const db = require('../config/mysql')();
const bcrypt = require('bcrypt');

module.exports = function (app) {
    app.get('/login', (req, res, next) => {
        if (req.query.status && req.query.status === 'badcredentials') {
            res.locals.status = 'ugyldigt brugernavn eller adgangskode';

        }
        res.render('login', { title: 'Log ind' });
    });

    app.post('/auth/login', (req, res, next) => {
        db.query('SELECT id FROM users WHERE username = ? AND password = ?', [req.fields.username, req.fields.password], (err, result) => {
            if (err) return next(`${err} at db.query (${__filename}:9:5)`);
            if (result.length !== 1) {
                res.redirect('/login?status=badcredentials');
                return;
            }
            req.session.user = result[0].id;
            res.render('profile');
        });
    });
};