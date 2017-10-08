var apiai = require('apiai');
var Promise = require('promise');

var config = require('./config.js');

// var app = apiai(config.aitoken);

module.exports = class AiBot{

	// const app;
	constructor(){
		this.app = apiai(config.aitoken);	
		var request = this.app.textRequest("who are you", {
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

	getResponse(text){
	    return new Promise(function(resolve, reject){
	        console.log("call : ", text);
	        var request = this.app.textRequest(text, {
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

}



