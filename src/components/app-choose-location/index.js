require('./style.css');

module.exports = require('marko-widgets').defineComponent({
    template: require('./template.marko'),
    init: function() {
        console.log('Initializing ' + __filename);
        var _this = this;

        this.$().submit(function(event) {
            event.preventDefault();
            _this.handleSubmit();
        });
    },

    handleSubmit: function() {
        var location = this.getEl('query').value;
        this.emit('locationSelected', {
            query: location
        });
    },

    setLocation: function(text) {
        this.getEl('query').value = text;
    }
});