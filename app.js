var restify = require('restify');
var SlackBot = require('slackbots');
var Promise = require('promise');
var http = require('http');
var firebase = require('firebase');


var apiai = require('./appI');
var botutil = require('./slackbot');
var config = require('./config');
var fireb = require('./fire');

// create a bot
// var bot = new SlackBot({
//     token: config.slacktoken,
//     name: config.slackname
// });
var bot = botutil.bot;

bot.on('message', function(data) {
    // botutil.getInfo(data);
    if(botutil.isMessageFromUser(data) ){
        apiai.call(data.text).then(function(r){
            var speech = r.result.fulfillment.speech;
            // console.log("user data ", data);
            // console.log("apiAi response ", r);
            console.log("status ",apiai.getStatus(r));
    
            bot.postMessage(data.channel, speech);             
        });
    }
});

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}
// function getinfo(req,res,next){
    // console.log("getinfo");
    // console.log(req.params.text);
    // var promise = new Promise(appI.call);
    // promise.then(function(r){
    //     console.log(r);
    //     res.send(r);
    //     next();
    // });
// }

// function getTasks(){
//     var refUsers = fire.database().ref('tasks');

// }


var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);
// server.get('/getinfo/:text', getinfo);

server.listen(8081, function() {

  console.log('%s listening at %s', server.name, server.url);
  // botutil.getAllUsers();
  // console.log(fireb.getTasks());
    // bot.getUserId("calhack").then(function(r){
    //     console.log("bot userID ",r);
    //     botID = r;
    // });
});