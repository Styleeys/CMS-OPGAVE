const db = require('../config/mysql')();

module.exports = function (app) {
    app.get('/login', (req, res, next) => {
        if (req.query.status && req.query.status === 'badcredentials') {
            res.locals.status = 'ugyldigt brugernavn eller adgangskode';
        } else {
            res.render('login', { title: 'Log ind' });
        }
    });

    app.post('/login', (req, res, next) => {
        db.query('SELECT id FROM users WHERE username = ? AND password = ?', [req.fields.username, req.fields.password], (err, results) => {
            if (err) {
                res.send('');
                console.log('fejl:' + err);
            } else if (results.length !== 1) {
                res.redirect('/login?status=badcredentials');
            } else
            req.session.user_id = results[0].id;
            res.redirect('/profil');

    });
});
}
