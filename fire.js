var firebase = require('firebase');
var config = require('./config');
var HashMap = require('hashmap');
var Task = require('./task');

var fireO = firebase.initializeApp(config.fire);

module.exports = {
	fire: fireO,
	getTasks : function(title){
		return new Promise(function(resolve, reject){
			var task=[]

			// var taskRef = fireO.database().ref('/tasks/');
			// var taskKey = taskRef.push()
			var taskRere = fireO.database().ref("tasks");
			taskRere.orderByKey().on("child_added", function(snapshot){
				// console.log(snapshot.val().incident_name);
			var t = snapshot.val();
			// taskRere.once('value').then(function(snapshot){
			// 	// var t = snapshot.val();
			// 	// console.log(snapshot.val() || 'Anonymous');
			// 	var thisTaskID = snapshot.val().task_id;
			// 	console.log(thisTaskID);
			// 	console.log("taskKey");
			
				// t.forEach(function(te){console.log(te);});
			if(snapshot.val().incident_name=="Burger"){
				var temp = new Task(t.task_title, t.task_id,t.task_description, t.task_eta, 0, t.task_dependency);
				// console.log(temp);
				task.push( temp);
			}
			
			// resolve(task);
			if(task.length>0){
				// console.log(task);
				resolve(task);
			}else
				reject({});
			// });
			});
		});
			// console.log("task data is : ", fireO.database().ref('tasks'));
			// return fireO.database().ref('tasks');
	},
	pushUser: function(users){
        return new Promise(function(resolve, reject){

			var map = new HashMap();
			users.forEach(function(u){
				map.set(u.id, u.name);
			});
			var userRef = fireO.database().ref('users');
			userRef.once('value').then(function(snapshot) {
				if(map.has(snapshot.val().user_id)){
					map.delete(snapshot.val().user_id);
				}
			});
			users.forEach(function(u){
				if(map.has(u.id)){
					
					var t = {
						user_id: u.id,
					    user_role: u.level,
					    user_username: u.name 
					}
					var updates={};
					updates[u.id] = t;
					userRef.update(updates);
				}
			});
			resolve({});
			// reject();
		});	


	} 
}


