var config = require('./config');
var mongoose = require('mongoose');

var db = mongoose.connect(   'mongodb://' + 
                        config.params.dbuser + ':' +
                        config.params.dbpass + '@' +
                        config.params.dbhost + '/' +
                        config.params.dbname);

exports.db = db;