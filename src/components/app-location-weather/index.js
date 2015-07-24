module.exports = require('marko-widgets').defineComponent({
    template: require('./template.marko'),

    getTemplateData: function(state, input) {
        var weatherData = input.weatherData;

        var location = weatherData.location;

        return {
            weatherData: weatherData,
            location: location || weatherData.requestedLocation,
            invalidLocation: location == null
        };
    }
});