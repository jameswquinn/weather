var $ = require('jquery');

exports.getCurrentWeather = function(options, callback) {
    var query = options.query;

    $.getJSON('/api/weather/' + encodeURIComponent(query))
        .done(function(data) {
            callback(null, data);
        })
        .fail(function(err) {
            callback(err || 'Request failed');
        });
};