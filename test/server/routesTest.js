var http = require('http');
var app = require('../../app');
app.set('port', process.env.PORT || 3234);
var server;

function checkRoute(uri, callback){
    var options = {
        host: "localhost",
        port: process.env.PORT || 3234,
        path: uri,
        method: 'GET'
    };

    http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            callback(chunk);
        });
    }).end();
}

//noinspection JSUnusedGlobalSymbols
module.exports = {
    setUp: function (callback) {
        server = app.listen(app.get('port'), function () {
            callback();
        });
    },
    tearDown: function (callback) {
        // clean up
        server.close(function () {
            callback();
        });
    },
    testIndex: function (test) {
        checkRoute("/", function(response){
            test.ok(response.indexOf("<h1>Bootstrap starter template</h1>") !== -1, "this assertion should pass");
            test.done();
        });
    },
    testAbout: function (test) {
        checkRoute("/about", function(response){
            test.ok(response.indexOf("<h1>About</h1>") !== -1, "this assertion should pass");
            test.done();
        });
    },
    testContact: function (test) {
        checkRoute("/contact", function(response){
            test.ok(response.indexOf("<h1>Contact</h1>") !== -1, "this assertion should pass");
            test.done();
        });
    }
};