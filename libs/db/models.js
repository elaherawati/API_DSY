var mongoose = require('mongoose');
var Conn = require('../db/connection');
var db = Conn.db;

// Schema

var Schema = mongoose.Schema;  

// SCHEMA AUTH
var Users = new Schema({  
    username: { type: String, required: true },  
    password: { type: String, required: true }
});

var UsersModel = mongoose.model('users', Users);

exports.UsersModel = UsersModel;

// SCHEMA DATA
var data = new Schema({
	  		 name: {type: String, required: true},
			 mail: {type: String, required: true},
			 addr: {type: String, required: true},
			 telp: {type: String, required: true}
		  });
var dataModel = db.model('data', data);
exports.dataModel = dataModel;