var apiai = require('apiai');
var config = require('./config.js');
var app = apiai(config.aitoken);

module.exports.call = function(text){

    return new Promise(function(resolve, reject){
        console.log("call : ", text);
        var request = app.textRequest(text, {
            sessionId: '1'
        });

        request.on('response', function(response) {
            console.log(response.result.action);
            resolve(response);
        });

        request.on('error', function(error) {
            console.log(error);
            reject(error);
        });

        request.end();
    });
}