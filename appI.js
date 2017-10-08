var apiai = require('apiai');
var config = require('./config.js');
var appO = apiai(config.aitoken);

module.exports = { 
    app : appO,
    call : function(text){

        return new Promise(function(resolve, reject){
            console.log("call : ", text);
            var request = appO.textRequest(text, {
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
    },

    getIntent: function(text){
        if(getStatus(text))
            return false
        else
            return text.metadata.intentName;
    },
    getStatus: function(text){
        return text.result.actionIncomplete;
    },
    getParams: function(text){
        return text.parameters;
    }

}