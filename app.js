var restify = require('restify');
var SlackBot = require('slackbots');
var apiai = require('apiai');
var async = require('async');
var appI = require('./appI');
var Promise = require('promise');
var http = require('http');
var botID;


// create a bot
var bot = new SlackBot({
    token: 'xoxb-252387996912-lr4RmhvmUqb9JHkf9A7f83t9',
    name: 'calhack1'
});

/**
 * @param {object} data 
 */
bot.on('message', function(data) {
    // all ingoing events https://api.slack.com/rtm
    if(data.text && !data.bot_id){
        console.log(data.user, " : ", botID);
        console.log(data.text);
        appI.call(data.text).then(function(r){
            console.log("resolved");
            var speech = r.result.fulfillment.speech;
            console.log(speech);
            console.log("user is ", data);
    
            bot.postMessage(data.channel, speech);             
            // res.send(r);
            // next();
        });
    }
    // console.log(data.text);
});


function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}
function getinfo(req,res,next){
    // console.log("getinfo");
    // console.log(req.params.text);
    // var promise = new Promise(appI.call);
    // promise.then(function(r){
    //     console.log(r);
    //     res.send(r);
    //     next();
    // });
}


var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);
server.get('/getinfo/:text', getinfo);

server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
    // bot.getUserId("calhack").then(function(r){
    //     console.log("bot userID ",r);
    //     botID = r;
    // });
});