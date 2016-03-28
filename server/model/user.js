var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = {
	schema : userSchema = new Schema({
		email: String, 
		password: String
	}),
	
	saveUser : function(res, err, createUser) {
		createUser.save(function(err, user){
			if (err) {
				res.send('Fehler beim Speichern vom User');
				return;
			};
			res.send('Gespeichert wurde: \n' + user);
		});		
	}
}

