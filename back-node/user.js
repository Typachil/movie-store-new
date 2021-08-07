let MongoClient = require('mongodb').MongoClient;
let assert = require('assert');
let url = 'mongodb://127.0.0.1:57266';

module.exports = {
	signup: (name, email, password) => {
		MongoClient.connect(url, (err, db) => {
		  	db.collection('user').insertOne( {
				"name": name,
				"email": email,
				"password": password
			},(err, result) => {
				assert.equal(err, null);
		    	console.log("Saved the user sign up details.");
			});
		});
	},
	validateSignIn: (email, password, callback) => {
		MongoClient.connect(url, (err, db) => {
			console.log(email,password);
			db.collection('user').findOne( { email : email ,password: password 
			}, (err, result) => {
				if(result==null){
					console.log('returning false')
					callback(false)
				}
				else{
					console.log('returning true')
					callback(true)
				}
			});
		});
	},
	getUsers : () =>{
		MongoClient.connect(url, (err, db) => {
			db.collection('user').find().toArray((err, results) => {
				return results;
				console.log(results)
			})
		});
	}
}