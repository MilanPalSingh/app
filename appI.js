var apiai = require('apiai');

var app = apiai("30ce048ffe724964856e428d367ea748");

module.exports.call =  function(resolve, reject, text){
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
}