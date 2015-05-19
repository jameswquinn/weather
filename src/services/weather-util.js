var xml2js = require('xml2js');
var baseIconUrl = 'http://openweathermap.org/img/w/';

exports.parseCurrentWeatherXml = function(xml, options, callback) {

    var requestedLocation = options.query || options.location;
    var result = {
        requestedLocation: requestedLocation
    };

    xml2js.parseString(xml, { explicitArray: false, mergeAttrs: true }, function(err, parsed) {
        
        
        if (!parsed) {
            return callback(null, result);
        }

        var current = parsed.current;

        var cityData = current.city;
        if (cityData) {
            result.city = cityData.name;
            result.country = cityData.country;

            if (result.city && result.country) {
                result.location = result.city + ', ' + result.country;
            } else {
                result.location = result.city || result.country;
            }
        }

        if (current.temperature) {
            result.tempCurrent = current.temperature.value;
            result.tempLow = current.temperature.min;
            result.tempHigh = current.temperature.max;
        }

        if (current.humidity) {
            result.humidity = current.humidity.value + '%';
        }

        if (current.pressure) {
            result.pressure = current.pressure.value + ' ' + current.pressure.unit;
        }

        if (current.wind) {
            var windSpeed = current.wind.speed;
            if (windSpeed) {
                result.windSpeed = windSpeed.value;
                result.windSpeedDesc = windSpeed.name;
            }
            
            var direction = current.wind.direction;
            if (direction) {
                result.windDegrees = direction.value;
                result.windDirection = direction.name;   
            }
        }

        var clouds = current.clouds;
        if (clouds) {
            result.cloudsDesc = clouds.name;
            result.cloudsPercentage = clouds.value;
        }

        var precipitation = current.precipitation;

        if (precipitation) {
            result.precipitationType = precipitation.mode;
            result.precipitationRate = precipitation.value;
        }

        var weather = current.weather;
        if (weather) {
            if (Array.isArray(weather)) {
                weather = weather[0];
            }

            if (weather.icon) {
                result.iconUrl = baseIconUrl + weather.icon + '.png';
            }

            result.desc = weather.value;
        }

        
        
        callback(null, result);    
    });
};