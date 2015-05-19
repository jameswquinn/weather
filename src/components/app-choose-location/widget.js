function Widget() {

    console.log('Initializing ' + __filename);
    var _this = this;

    this.$().submit(function(event) {
        event.preventDefault();
        _this.handleSubmit();
    });
}

Widget.prototype = {
    handleSubmit: function() {
        var location = this.getEl('query').value;
        this.emit('locationSelected', {
            query: location
        });
    },

    setLocation: function(text) {
        this.getEl('query').value = text;
    }
};

exports.Widget = Widget;