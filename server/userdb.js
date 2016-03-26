var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

module.exports = {
	isDBAvailable : function() {
		MongoClient.connect(url, function(err, db) {
		  assert.equal(null, err);
		  db.close();
		  if (err == null) {
		  	return true;
		  } else {
		  	return false;
		  }
		});
	},
	isUserAlreadyInDB: function (username) {
		var json = { "username" : username };
		MongoClient.connect(url, function(err, db) {
			
			var cursor = db.collection('test').find(json);
			cursor.each(function(err, doc) {
				assert.equal(err, null);
				
				if (doc != null) {
					console.dir(doc);
				} else {
					console.log("nichts");
				}

			});
		});
		return false;
	}, 
    addUser: function(username, password) {
    	var json = { "username" : username, "password" : password.toString() };
    	
    	MongoClient.connect(url, function(err, db) {
    		
    		db.collection('test').insertOne(json, function(err, result) {
			    assert.equal(err, null);
			    console.log("Inserted a document into the restaurants collection.");
		  	});

    	});
	}
}