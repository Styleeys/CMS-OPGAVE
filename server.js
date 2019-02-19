const express = require('express');
const app = express();

const ejs = require('ejs');
app.set('view engine', 'ejs');

// const db = require('../config/mysql')();

const formadable = require('express-formidable');
app.use(formadable());


app.use(express.static('./public'));

//require('./config/mysql')(app);
require('./config/session')(app);
require('./routes/auth')(app);
require('./routes/opret')(app);
require('./routes/about_us')(app);
require('./routes/profile')(app);
require('./routes/redigere_profil')(app);

// ========================ROUTES========================================

app.get('test',(req, res, next) => {
    res.send('Hello');
});
app.get('/',(req, res, next) => {
    res.render('forside');
});

// ========================ROUTES-END========================================

app.listen(3000,() => {
    console.log('http://localhost:3000');
})