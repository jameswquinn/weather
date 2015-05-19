var template = require('marko').load(require.resolve('./template.marko'));

exports.render = function(data, out) {
    var weatherData = data.weatherData;

    var location = weatherData.location;

    template.render({
        weatherData: weatherData,
        location: location || weatherData.requestedLocation,
        invalidLocation: location == null
    }, out);
};