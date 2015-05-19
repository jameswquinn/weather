var template = require('marko').load(require.resolve('./template.marko'));
var weatherService = require('../../services/weather');

module.exports = function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    var location = req.params.location || req.query.location;

    function weatherDataProvider(arg, callback) {
        if (!location) {
            return callback();
        }

        weatherService.getCurrentWeather({query: location}, callback);
    }

    template.render({
            weatherDataProvider: weatherDataProvider
        }, res);
};
