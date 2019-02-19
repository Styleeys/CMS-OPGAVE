const db = require('../config/mysql')();
const fs = require('fs');


module.exports = function (app) {
    // app.get('/profile', (req, res, next) => {
    //     db.query(`SELECT profiles.firstname, profiles.lastname, profiles.bio FROM profiles 
    // INNER JOIN profiles ON recipes.users_id = profiles.id 
    // INNER JOIN users ON users.id = profiles.id WHERE users_id = ?`, [req.session.user], (err, result) => {
    //             if (err)
    //                 console.log(err)
    //             res.render('profile', { 'results': result });
    //         });
    // });
    app.get('/profil', (req, res) => {
        db.query('SELECT * FROM crud.profiles WHERE profiles = ?', [req.params.id], function (err, results) {
            if (err) return res.send(err);
            res.render('profile', {title: 'profile', 'results': results});
        });
    });

    app.get('/logout', (req, res) => {
        req.session.destroy(); res.redirect('/login');
    });
}
