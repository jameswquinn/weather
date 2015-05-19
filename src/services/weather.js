var request = require('request');
var weatherServiceUtil = require('./weather-util');

// var sampleData = {
//     city: 'Fort Collins',
//     country: 'United States of America',
//     location: 'Fort Collins, United States of America',
//     tempCurrent: '278.73',
//     tempLow: '277.04',
//     tempHigh: '280.93',
//     humidity: '98%',
//     pressure: '1009 hPa',
//     windSpeed: '4.21',
//     windSpeedDesc: 'Gentle Breeze',
//     windDegrees: '269.005',
//     windDirection: 'West',
//     cloudsDesc: 'sky is clear',
//     cloudsPercentage: '8',
//     precipitationType: 'rain',
//     precipitationRate: '0.69',
//     iconUrl: 'http://openweathermap.org/img/w/10d.png',
//     desc: 'light rain'
// };

exports.getCurrentWeather = function(options, callback) {
    var query = options.query || options.location;

    var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + query + '&mode=xml';
    request(url, function(err, response, body) {
        if (err) {
            return callback(err);
        }

        if (response.statusCode !== 200) {
            return callback('Request to ' + url + ' return status code ' + response.statusCode);
        }

        weatherServiceUtil.parseCurrentWeatherXml(body, options, callback);
    });
};