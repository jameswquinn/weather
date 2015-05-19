var weatherService = require('../../services/weather');
var locationWeather = require('../app-location-weather');

function Widget() {
    var chooseLocation = this.getWidget('chooseLocation');
    var _this = this;

    this.subscribeTo(chooseLocation)
        .on('locationSelected', function(location) {
            _this.showWeatherForLocation(location);

        });

    window.addEventListener('popstate', function(event) {
        var state = event.state;
        if (state) {
            if (state.type === 'weatherLocation') {
                _this.showWeatherForLocation(state, false);
            }
        } else {
            _this.hideWeather();
        }

    });
}



Widget.prototype = {
    hideWeather: function() {
        var $weatherContainer = this.$('#weatherContainer');
        $weatherContainer.hide();
        this.getWidget('chooseLocation').setLocation('');
    },

    showWeatherForLocation: function(location, updateHistory) {
        var targetEl = this.getEl('weatherContainer');
        var $loading = this.$('#loading');
        var $weatherContainer = this.$('#weatherContainer');

        this.getWidget('chooseLocation').setLocation(location.query);

        if (updateHistory !== false) {
            window.history.pushState({
                    type: 'weatherLocation',
                    query: location.query
                },
                '',
                '/weather/' + encodeURIComponent(location.query));
        }


        $weatherContainer.hide();
        $loading.show();

        weatherService.getCurrentWeather(location, function(err, data) {
            $loading.hide();

            locationWeather.render({
                    weatherData: data
                })
                .replaceChildrenOf(targetEl);

            $weatherContainer.show();
        });
    }
};



exports.Widget = Widget;