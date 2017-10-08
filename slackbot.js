var SlackBot = require('slackbots');
// var apiai = require('apiai');
// var Promise = require('promise');
// var http = require('http');

// var appI = require('./ai');
// var fire = require('./fire');
var config = require('./config.js');

const botO = new SlackBot({
    token: config.slacktoken,
    name: config.slackname
});

module.exports = {
	bot: botO,
	getInfo : function(data){
		console.log("from get info: ", data);

	},
	isUser : function(){},
	isMessageFromUser: function(data){
		return data.text && !data.bot_id
	},
	getAllUsers: function(data){
		botO.getUsers().then(function(r){
			console.log("all users: ",r);
		});
	}	
}





