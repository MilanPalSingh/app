var firebase = require('firebase');
var config = require('./config');

var fireO = firebase.initializeApp(config.fire);

module.exports = {
	fire: fireO,
	getTasks : function(){
		console.log("task data is : ", fireO.database().ref('tasks'));
		return fireO.database().ref('tasks');
	} 
}