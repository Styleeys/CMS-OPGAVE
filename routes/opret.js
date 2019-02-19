const db = require('../config/mysql')();
const bcrypt = require('bcrypt');

module.exports = (app) => {

    app.get('/user/opret', (req, res) => {
        res.render('opret_bruger', { title: 'Log ind' });
    });

    app.post('/user/opret', (req, res, next) => {
        let success = true;
        let errorMessage;

        let hashPassword = bcrypt.hashSync(req.fields.password, 10);
        db.query(`INSERT INTO users (username, password) VALUES (?, ?) `, [req.fields.username, hashPassword], (err) => {
            if (err) {
                console.log(err);
            } else
                //Data indsat korrekt//
                res.redirect('login');
        });
    });
}
