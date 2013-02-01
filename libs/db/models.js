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




/*
/////////////////////////////////ADMIN WORKSPACE/////////////////////////////
//manage company
var company = new Schema({
	  		///////isi///////
    
            /////////////////
		  });
var compModel = db.model('company', company);
exports.compModel = compModel;

//manage tenant
var tenant = new Schema({
	  		 ///////isi///////
    
            /////////////////
		  });
var tenModel = db.model('tenant', tenant);
exports.tenModel = tenModel;

//manage users
var user = new Schema({
	  		 ///////isi///////
    
            /////////////////
		  });
var usModel = db.model('user', user);
exports.usModel = usModel;

//manage groups
var group = new Schema({
	  		 ///////isi///////
    
            /////////////////
		  });
var groModel = db.model('group', group);
exports.groModel = groModel;

//manage roles/ptivilages
var role = new Schema({
	  		 ///////isi///////
    
            /////////////////
		  });
var roleModel = db.model('role', role);
exports.roleModel = roleModel;

//manage modules
var module = new Schema({
	  		 ///////isi///////
    
            /////////////////
		  });
var modModel = db.model('module', module);
exports.modModel = modModel;

//manage dashbosrd
var dashboard = new Schema({
	  		 ///////isi///////
    
            /////////////////
		  });
var dashModel = db.model('dashboard', dashboard);
exports.dashModel = dashModel;

//broadcast message
var message = new Schema({
	  		 ///////isi///////
    
            /////////////////
		  });
var messModel = db.model('message', message);
exports.messModel = messModel;
//////////////////////////////////////////////////////////////////////////////
*/