module.exports = function (app) {
    app.get('/about/us',(req, res, next) => {
        res.render('aboutUs');
    });
}

