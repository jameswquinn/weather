var weatherService = require('../services/weather');

module.exports = function(req, res) {
    var location = req.params.location || req.query.location;

    weatherService.getCurrentWeather({query: location}, function(err, data) {
        res.json(data);
    });
};