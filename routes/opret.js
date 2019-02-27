const db = require('../config/mysql')();
const bcrypt = require('bcrypt');

module.exports = (app) => {

    app.get('/user/opret', (req, res) => {
        res.render('opretBruger');
    });

    app.post('/user/opret', (req, res, next) => {
        let success = true;
        let errorMessage;
        
        let hashPassword = bcrypt.hashSync(req.fields.password, 10);
        db.query(`INSERT INTO users (username, password, email) VALUES (?, ?, ?) `, [req.fields.username, hashPassword, req.fields.email], (err, result) => {
            if (err) {
                res.send('');
                console.log('fejl:' + err);
            } else {
                //Data indsat korrekt//
                res.render('login');
            }
        });
    });
}
