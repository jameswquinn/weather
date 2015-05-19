var fs = require('fs');
var nodePath = require('path');

exports.enable = function() {
    var servicesMockDir = nodePath.join(__dirname, 'src/services-mock');
    var servicesDir = nodePath.join(__dirname, 'src/services');
    fs.readdirSync(servicesMockDir).forEach(function(filename) {
        if (/-mock.js$/.test(filename)) {
            console.log('Enabling mock service for "' + filename + '"...');
            // This is a mock service module and we want to overwrite
            // methods in the non-mock version of the module
            var mockModule = require(nodePath.join(servicesMockDir, filename));
            var targetModule = require(nodePath.join(servicesDir, filename.slice(0, 0-'-mock.js'.length) + '.js'));

            for (var k in mockModule) {
                if (mockModule.hasOwnProperty(k)) {
                    targetModule[k] = mockModule[k];
                }
            }
        }
    });
};