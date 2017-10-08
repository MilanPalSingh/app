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
	getAllUsers: function(){
		botO.getUsers().then(function(r){
			// console.log("all users: ",r);
			return r;
		});
	},
	ifIncident: function(data){
		if(data.result.metadata.intentName=="Incident")
			return true;
		else
			return false;
	},
	assinTask: function(users, channel){
		users.forEach(function(u){
			u.tasks.some(function(t){
				if(t.status==0){
					var text ="@"+u.name +" can you take up this task: "+t.title;
					botO.postMessage(channel, text,{ parse:"full" });
				}
			});
		});

	},
	ifTaskAccptance: function(data){
		if(data.result.metadata.intentName=="Task Acceptance")
			return true;
		else 
			return false;
	},
	ifTaskRejection: function(data){
		if(data.result.metadata.intentName=="Task Rejection")
			return true;
		else
			return false;
	},
	
	ifTaskcomplete: function(data){
		if(data.result.metadata.intentName=="Task_complete")
			return true;
		else 
			return false;
		
	}



}





