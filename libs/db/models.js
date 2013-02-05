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





//manage company
var company = new Schema({
				init_company : {type: String, required: true},
				nama_company : {type: String, required: true},
				alamat_company : {type: String, required: true},
				no_telp : {type: String, required: true},
				deskripsi_company : {type: String, required: true}
		  });
var compModel = mongoose.model('company', company);
exports.compModel = compModel;

var tenant =  new Schema({
				init_tenant : {type: String, required: true},
				nama_tenant : {type: String, required: true},
				alamat_tenant : {type: String, required: true},
				no_telp : {type: String, required: true},
				pic : {type: String, required: true},
				notes : {type: String, required: true}
		   });
var tenModel = db.model('tenant', tenant);
exports.tenModel = tenModel;

//manage users
var user = new Schema({
			user_name : {type: String, required: true},
			id_group : {type: String, required: true},
			real_name : {type: String, required: true},
			is_active : {type: String, required: true},
			last_login : {type: String, required: true},
			id_tenant : {type: String, required: true}
		  });
var usModel = db.model('user', user);
exports.usModel = usModel;



//manage groups
var group = new Schema({
			  group_name : {type: String, required: true},
			  group_description : {type: String, required: true}
		  });
var groModel = db.model('group', group);
exports.groModel = groModel;

//manage modules
var module = new Schema({
			   parent_id : {type: String, required: true},
			   title : {type: String, required: true},
			   handler: {type: String, reqiured: true},
			   published: {type: String, required: true},
			   sort_id: {type: String, required: true}
		  });
var modModel = db.model('module', module);
exports.modModel = modModel;

//manage roles/ptivilages
var role = new Schema({
	  		 menu_id : {type: String, required: true},
			 group_id : {type: String, required: true},
			 is_active: {type: String, required: true}
		  });
var roleModel = db.model('role', role);
exports.roleModel = roleModel;

/*
/////////////////////////////////ADMIN WORKSPACE////////////////////////////


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