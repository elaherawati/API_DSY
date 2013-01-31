var mongoose = require('mongoose');
var Conn = require('../db/connection');
var db = Conn.db;

// Schema

var Schema = mongoose.Schema;  

// SCHEMA AUTH
var Users = new Schema({  
    username: { type: String, required: true },  
    password: { type: String, required: true },
    group_id: { type: String, required: true },
    api_key: { type: String, required: true },
    workspace: { type: String, required: true },
    email: { type: String, required: true }
});

var UsersModel = mongoose.model('users', Users);

exports.UsersModel = UsersModel;


// SCHEMA DATA
var data = new Schema({
	  		 warna: {type: String, required: true},
			 ukuran: {type: String, required: true},
			 merk: {type: String, required: true},
			 jenis: {type: String, required: true}
		  });
var dataModel = db.model('data', data);
exports.dataModel = dataModel;
