var template = require('marko').load(require.resolve('./template.marko'));
var tempConv = require('temp-units-conv');

exports.render = function(data, out) {

    var weatherData = data.weatherData;

    var currentTempK = weatherData.tempCurrent;
    var lowTempK = weatherData.tempLow;
    var highTempK = weatherData.tempHigh;

    var precipitationType = weatherData.precipitationType;
    precipitationType = precipitationType ? precipitationType.charAt(0).toUpperCase() + precipitationType.substring(1) : null;

    var precipitationRate = weatherData.precipitationRate;

    if (!precipitationRate) {
        precipitationRate = 'None';
        precipitationType = 'Precipitation';
    } else {
        precipitationRate += ' mm/hour';
    }

    var viewModel = {
        temp: parseInt(tempConv.k2f(currentTempK)+0.5, 10) + ' °F',
        low: parseInt(tempConv.k2f(lowTempK)+0.5, 10) + ' °F',
        high: parseInt(tempConv.k2f(highTempK)+0.5, 10) + ' °F',
        iconUrl: weatherData.iconUrl,
        description: weatherData.desc,
        humidity: weatherData.humidity,
        cloudiness: weatherData.cloudsDesc,
        pressure: weatherData.pressure,
        windSpeed: weatherData.windSpeed,
        windSpeedDesc: weatherData.windSpeedDesc,
        windDegrees: weatherData.windDegrees,
        windDirection: weatherData.windDirection,
        precipitationRate: precipitationRate,
        precipitationType: precipitationType
    };

    template.render(viewModel, out);
};