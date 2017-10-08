var user = require('./user');
var fireb = require('./fire');
var Task = require('./task');


module.exports = {
	creatUserArray: function(data){
        return new Promise(function(resolve, reject){

			// console.log("from the util file ", data);
			users = [];
			data.members.forEach(function(u) {
			    if(!u.is_bot && u.name!="slackbot"){
				    var temp = new user();
			    	temp.id = u.id;
			    	temp.name = u.name;
			    	temp.level = u.is_admin;
			    	temp.avalability = true;
			    	users.push(temp);
			    }
			});
			// console.log(users);

			fireb.pushUser(users).then(function(r){
				resolve(users);
			});
				resolve(users);

			reject({});
		});
	},
	assinTask: function(users, task){
        return new Promise(function(resolve, reject){
        if(task.length>0){	
        	task.forEach(function(t){
        		if(t.dependency.length=0){
        			users.some(function(u){
        				if(u.task.length==0){
        					u.tasks.push(t);
        					return true;
        				}
        			});
        		}
        	});
        	resolve([users, task]);
        }else{
        	reject([]);
        }

        	
        });
	}

}