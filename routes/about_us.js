module.exports = function (app) {
    app.get('/about_us',(req, res, next) => {
        res.render('about_us', { title: 'Log ind' });
    });
}

