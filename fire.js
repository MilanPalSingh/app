var firebase = require('firebase');
var config = require('./config');
var HashMap = require('hashmap');
var Task = require('./task');
const uuidv4 = require('uuid/v4');
// uuidv4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1' 
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
				var temp = new Task(t.task_title, t.task_id,t.task_description, t.task_eta, 0, t.task_dependency, uuidv4() );
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


	},
	newTaskAssigned: function(u,t){
		return new Promise(function(resolve, reject){
			var tuRef = fireO.database().ref('progress');
			console.log(" -> ",t.uuid);
			var te ={
				progress_id: t.uuid,
				user_id: u.id,
				task_id: t.id,
				task_status: 1
			}
			var updates={};
			updates[t.uuid] = te;
			tuRef.update(updates);
			resolve({});

		});

	},
	updateTaskAssigned: function(u,t){
		return new Promise(function(resolve, reject){
// 			var query fireO.database().ref("progress").orderByKey("progress_id").equalTo(t.uuid);
// query.once("child_added", function(snapshot) {
//   snapshot.ref.update({ task_status: 2 })
// });


		// 	var taskTU = fireO.database().ref("tasks");
		// 	taskTU.orderByKey().on("child_added", function(snapshot){
		// 		// console.log(snapshot.val().incident_name);
		// 	var t = snapshot.val();
		// 	console.log(t.task_id);
		// })

			console.log("updateing   .. ",t.uuid);
			var tuRef = fireO.database().ref('progress/'+t.uuid).set({
				progress_id: t.uuid,
				task_id: t.id,
				task_status: 2,
 				user_id: u.id 
			});
			// console.log(u, " -> ",t);
			// var te ={
			// 	progress_id: t.uuid,
			// 	user_id: u.id,
			// 	task_id: t.id,
			// 	task_status: 1
			// }
			// var updates={};
			// updates[t.uuid] = te;
			// tuRef.update(updates);
			resolve({});

		});

	},
	creatTask: function(t){

		var taskRere = fireO.database().ref("tasks");
		var td = t.result.parameters;
		temp ={
			task_id : uuidv4(),
			incident_name : td.food,
			task_description : td.task_description,
			task_eta: td.time,
			task_title: td.task_title 
		}


		var updates={};
		updates[temp.task_id] = temp;
		taskRere.update(updates);
	}


}


