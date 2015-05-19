var express = require('express');
var compression = require('compression');
var serveStatic = require('serve-static');

require('marko/browser-refresh').enable();
require('lasso/browser-refresh').enable('*.marko *.css *.less');

require('./config').onConfigured(function(err, config) {
    if (err) {
        throw err;
    }

    var app = express();

    var port = config.port;

    app.use(compression()); // Enable gzip compression for all HTTP responses
    app.use('/static', serveStatic(__dirname + '/static', config.serveStatic));

    require('./routes')(app);

    app.listen(port, function() {
        console.log('Listening on port %d', port);

        if (process.send) {
            process.send('online');
        }
    });
});