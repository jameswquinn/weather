module.exports = function(app) {
    // JSON API end points:
    app.get('/api/weather/:location', require('./src/api/weather'));

    // HTML end points:
    app.get('/weather/:location', require('./src/pages/home'));
    app.get('/', require('./src/pages/home'));
};