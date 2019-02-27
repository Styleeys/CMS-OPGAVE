const db = require('../config/mysql')();

module.exports = function (app) {

    app.get('/profil', (req, res, next) => {
        console.log('session user.id er ' + req.session.user_id); //Chekker id
        
        let sql = `SELECT
        profiles.firstname,
        profiles.lastname,
        profiles.bio,
        profiles.picture
        FROM
        crud.profiles
        WHERE profiles.user_id = ?`;
        db.query(sql,
            [req.session.user_id]
            ,function (err, results) {
            if (err) {
                res.send('');
                console.log('fejl:' + err);
            } else {
                res.render('profil', {'results': results});
            }
        });
    });


    app.get('/logout', (req, res) => {
        req.session.destroy(); res.redirect('/');
    });
}
