const express = require('express');
const app = express();


const ejs = require('ejs');
app.set('view engine', 'ejs');

// const db = require('../config/mysql')();

const formadable = require('express-formidable');
app.use(formadable());

app.use(express.static('./public'));

require('./config/session')(app);

let protectedRoutes = [
    '/profil',
    '/redigere/profil'
];

app.use(protectedRoutes, (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
        return;
    } else {
        next();
    }
});

require('./routes/login')(app);
require('./routes/opret')(app);
require('./routes/aboutUs')(app);
require('./routes/profil')(app);
require('./routes/redigereProfil')(app);

// ========================ROUTES========================================

app.get('test', (req, res, next) => {
    res.send('Hello');
});
app.get('/', (req, res, next) => {
    res.render('forside');
});

// ========================ROUTES-END========================================

app.listen(3000, () => {
    console.log('http://localhost:3000');
})