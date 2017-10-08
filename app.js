var restify = require('restify');
var Promise = require('promise');


var apiai = require('./appI');
var botutil = require('./slackbot');
var config = require('./config');
var fireb = require('./fire');
var utill = require('./util');
var user = require('./user');
var task = require('./task');

var gUsers=[];
var gTask =[];
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
            // get the reply from apiAI
            if(botutil.ifIncident(r) ){
                if(!apiai.getStatus(r)){
                    // console.log("assine task ",r.result.parameters);
                    fireb.getTasks(r.result.parameters.food).then(function(r){
                        gTask = r;
                    });
                    utill.assinTask(gUsers, gTask).then(function(res){
                        gUsers = res[0];
                        gTask = res[1];
                        console.log(gUsers);
                        // push message to channel using bot from gUser obj
                        bot.assinTask(gUsers, data.channel);
                    });
                }else{
                    bot.postMessage(data.channel, r.result.fulfillment.speech);             
                }
            }else if(botutil.ifTaskAccptance(r)){

            }else{
                var speech = r.result.fulfillment.speech;
                // console.log("user data ", data);
                // console.log("apiAi response ", r);
                // console.log("status ",apiai.getStatus(r));
        
                bot.postMessage(data.channel, speech);             
            }
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
  bot.getUsers().then(function(r){
    utill.creatUserArray( r).then(function(re){
        re.forEach(function(u){
            gUsers.push(new user(u.id, u.name, u.level) )
        });
        console.log(gUsers);
    });
  });
  // console.log(fireb.getTasks());
    // bot.getUserId("calhack").then(function(r){
    //     console.log("bot userID ",r);
    //     botID = r;
    // });
});





