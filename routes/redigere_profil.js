const db = require('../config/mysql')();
var session = require('express-session');
module.exports = function (app) {

    app.get('/redigere', (req, res) => {
        res.render('redigere_profil');
    });

    app.post('/user/profil', (req, res, next) => {
        db.query(`INSERT INTO profiles (firstname, lastname, bio) VALUES (?, ?, ?)`, [req.fields.firstname, req.fields.lastname, req.fields.bio], (err, result) => {
            if (err) {
                console.log(err);
            } else
            res.render('profile');
        });
    });
    app.patch('/user/profil', (req, res, next) => {
		db.query(`UPDATE profiles SET firstname = ?, lastname = ?, bio = ? WHERE users_id = ?`, [req.fields.firstname, req.fields.lastname, req.fields.bio, req.session.users_id], (err, result) => {
            if (err) {
                console.log(err);
            } else
			res.end();
		})
	});
}