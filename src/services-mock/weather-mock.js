var weatherData = {
    "requestedLocation": "80521",
    "city": "Fort Collins",
    "country": "United States of America",
    "location": "Fort Collins, United States of America",
    "tempCurrent": "290.23",
    "tempLow": "287.04",
    "tempHigh": "292.59",
    "humidity": "26%",
    "pressure": "1012 hPa",
    "windSpeed": "4.11",
    "windSpeedDesc": "Gentle Breeze",
    "windDegrees": "126",
    "windDirection": "SouthEast",
    "cloudsDesc": "sky is clear",
    "cloudsPercentage": "0",
    "precipitationType": "no",
    "iconUrl": "http://openweathermap.org/img/w/01d.png",
    "desc": "Sky is Clear"
};

exports.getCurrentWeather = function(options, callback) {
    callback(null, weatherData);
};