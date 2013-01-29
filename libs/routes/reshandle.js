var connect = require('connect');
    connectRoute = require('connect-route'),
    url = require('url'),
    render = require('connect-render'),
    mongoose = require('mongoose'),
    ModelSchema = require('../db/models'),
    UsersModel = ModelSchema.UsersModel,
    dataModel = ModelSchema.dataModel;

var route = function (r) {
    // Home    
    r.get('/', function (req, res, next) {
        res.render('./page/index.html', { url: req.url });
    });
    
    // Routing
    r.get('/:r', function (req, res, next) {
        switch (req.params.r) {
            case 'api'      :   res.render('./api/index.html', { url: req.url });
                                break;
            
            case 'login'    :   res.render('./page/login.html', { url: req.url });
                                break;
            
            case 'logout'   :   if (req.session.username) {
                                    req.session.destroy();
                                }
                                
                                res.redirect('/');
                                break;
            
            case 'member'   :   // Check session
                                if (!req.session.username) {
                                    // If false
                                    res.redirect('/');
                                } else {
                                    // If true
                                    res.render('./page/member.html', {username: req.session.username}, { url: req.url });
                                }
                                break;
        }
    });
    
    // Login
    r.post('/login/process', function (req, res) {
        var select = {
            username: req.body.username
          , password: req.body.password
        };
      
        UsersModel.findOne(select, function(err, users) {
          if (!err && users) {
            // Register session
            req.session.username = req.body.username;
            res.redirect('/member');
          } else {
            // Login failed
            res.redirect('/login');
          }
          
        });
    });
    
    // READ ALL DATA
	r.get('/:r/:key/', function(_req, _res){
	if(_req.params.r == 'api'){
		if(_req.params.key == 'data'){
			return dataModel.find(function(err, usr){
				 console.log(usr);
				_res.end("usr");
			});
			//return _res.end("INI ADALAH API DATA");
		}else{
			return _res.end("UNDEFINE PARAMETER");
		};
	}else{
		return _res.end("UNDEFINE API");
	}
	});
	
	// CREATE DATA
	r.post('/:r/:key/', function(_req, _res){
		if(_req.params.r == 'api'){	
		if(_req.params.key == 'data'){
			var user;
			user = new dataModel({
				name: _req.body.name,
                mail: _req.body.mail,
                addr: _req.body.addr,
				telp: _req.body.telp
				});
			user.save(function(err){
				if(!err){
					_res.end("DATA SAVE");
				}else{
					_res.end("ERROR");
				}
			})
			  console.log(user);
			}else{
			  return _res.end('PARAMETER UNDEFINE');
			};
		}else{
			return _res.end('API ERROR !!!');
		};  
	});
	
	// READ DATA BY ID PARAM
	r.get('/:r/:key/g/', function(_req, _res){
		if(_req.params.r == 'api'){
		  if(_req.params.key == 'data'){
			var url_path = url.parse(_req.url, true);
			console.log(url_path);
			return dataModel.find(url_path, function(err, user){
			  if (!err) {
				console.log(user);
				_res.end("OK");
			  }else{
				return console.log(err);
			  };
			});
		  }else{
			return _res.end('PARAMETER UNDEFINE');
		  };
		}else{
		  return _res.end('API ERROR !!!');
		};
	});
	
	// UPDATE DATA BY ID PARAM
	r.put('/:r/:key/u/', function(_req, _res){
		if(_req.params.r == 'api'){
		  if(_req.params.key == 'data'){
			var url_path = url.parse(_req.url, true);
			return dataModel.findOne(url_path, function(_err, _user){
			  console.log(_user);
			  if(!_err){
				_user.name = _req.body.name,
				_user.mail = _req.body.mail,
                _user.addr = _req.body.addr,
                _user.telp = _req.body.telp,
				_user.save(function(error){
				  if(!error){
					return _res.end("USER UPDATE !!!");
				  }else{
					console.log(error);
					_res.end("ERROR");
				  };
				});
			  }else{
				console.log(err);
			  }
			});
		  }else{
			return _res.end('PARAMETER UNDEFINE');
		  };
		}else{
		  return _res.end('API ERROR !!!');
		};
	});
	
	// DELETE DATA BY ID PARAM
	r.delete('/:r/:key/d/', function(_req, _res){
		if(_req.params.r == 'api'){
		  if(_req.params.key == 'data'){
			var url_path = url.parse(_req.url, true);
			return dataModel.findOne(url_path, function(_err, _user){
			  if (!_err){
				return _user.remove(function(error){
				  if(!error){
					return _res.end("User has Delete !!!");
				  }else{
					return console.log(error);
				  };
				});
			  }else{
				return console.log(err);
			  };
			});
		  }else{
			return _res.end('PARAMETER UNDEFINE');
		  };
		}else{
		  return _res.end('API ERROR !!!');
		};
	});
};

var connRoute = connectRoute(route);

var routing = {
    fnRoute: route,
    doRoute: connRoute
};

exports.router = routing;
