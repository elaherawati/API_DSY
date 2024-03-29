var connect = require('connect');
    connectRoute = require('connect-route'),
    url = require('url'),
    render = require('connect-render'),
    mongoose = require('mongoose'),
    ModelSchema = require('../db/models'),
    UsersModel = ModelSchema.UsersModel,
    dataModel = ModelSchema.dataModel,
	compModel = ModelSchema.compModel,
	tenModel = ModelSchema.tenModel,
	usModel = ModelSchema.usModel,
	groModel = ModelSchema.groModel,
	roleModel = ModelSchema.roleModel
	//modModel = ModelSchema.modModel,
	//dashModel = ModelSchema.dashModel;

var route = function (r) {
    r.get('/model', function(_req, _res){
        collection.find(API_DSY, function(err, models){
            if(!err){
                console.log(models);
            }else{
                console.log(err);
            }
        });
    });
    
    
    
    // Home    
    r.get('/', function (_req, _res, next) {
        _res.render('page/index.html', { url: _req.url });
    });
    
    // Routing
    r.get('/:r', function (_req, _res, next) {
        switch (_req.params.r) {
            case 'api'      :   _res.render('api/index.html', { url: _req.url });
                                break;
            
            case 'login'    :   _res.render('page/login.html', { url: _req.url });
                                break;
								
            case 'signup'   :   _res.render('page/signup.html', { url: _req.url });
                                break;
								
            case 'logout'   :   if (_req.session.username) {
                                    _req.session.destroy();
                                }
                                
                                _res.redirect('/');
                                break;
								
            case 'user'   :   // Check session
                                if (!_req.session.username) {
                                    // If false
                                    _res.redirect('/');
                                } else {
                                    // If true
                                    _res.render('page/member.html', {username: _req.session.username}, { url: _req.url });
                                }
                                break;
								
            case 'insert'   :   if (!_req.session.username) {
                                    // If false
                                    _res.redirect('/');
                                }else{
                                    _res.render('page/product_insert.html', {
										username: _req.session.username,
										api_key: _req.session.api_key,
										workspace: _req.session.workspace
									}, {
										url: _req.url
									});
                                }
                                break;
								
			case 'company'	:// Check session
								if (!_req.session.username) {
									// If false
									_res.redirect('/');
								} else {
									// If true
									compModel.find(function(err, companies) {
										if (!err && companies) {
											_res.render('./page/read.html', {
												username: _req.session.username,
												api_key: _req.session.api_key,
												workspace: _req.session.workspace,
												CompanyList: companies
											}, {
												url: _req.url
											});
										}
									});
								}
								break;
		}
    });
    
    // *****Sign Up*****
    r.post('/signup/proses', function(_req, _res){
        var user;
        user = new UsersModel({
            username: _req.body.username,
            password: _req.body.password,
            group_id: _req.body.group_id,
            api_key: _req.body.api_key,
            workspace: _req.body.workspace,
            email: _req.body.email,
			status: 1
        });
        user.save(function(err){
            if(!err){
				/*fs.mkdirParent = function(dirPath, mode, callback) {
					//Call the standard fs.mkdir
					fs.mkdir(dirPath, mode, function(error) {
						//When it fail in this way, do the custom steps
						if (error && error.errno === 34) {
							//Create all the parents recursively
							fs.mkdirParent(path.dirname(dirPath), mode, callback);
							//And then the directory
							fs.mkdirParent(dirPath, mode, callback);
						}
						//Manually run the callback since we used our own callback to do all these
						callback && callback(error);
					});
				};
				// Create Workspace                                
				var users_workspace = 'users/'.concat(req.body.username);   
				fs.mkdirParent(users_workspace);
				fs.mkdirParent(users_workspace.concat('/logs'));
				fs.mkdirParent(users_workspace.concat('/ux'));
				fs.mkdirParent(users_workspace.concat('/public'));
				fs.mkdirParent(users_workspace.concat('/res'));
				fs.mkdirParent(users_workspace.concat('/db'));
				*/
                _res.end("USER SAVE");
                _res.redirect('/');
            }else{
                _res.end("ERROR");
            };
        }); 
	});
    
    // *****Login*****
    r.post('/login/process', function (_req, _res) {
        var select = {
            username: _req.body.username
          , password: _req.body.password
        };
      
        UsersModel.findOne(select, function(err, users) {
          if (!err && users) {
            // Register session
            _req.session.username = _req.body.username;
			_req.session.api_key = users.api_key;
			_req.session.workspace = users.workspace;
            _res.redirect('/user');
          } else {
            // Login failed
            _res.redirect('/login');
          }
          
        });
    });
///////////////////////////////////////////////////////////////////////    
        // *****Read Activation*****
    r.get('/:r/:key/:ws', function(_req, _res){
        if(_req.params.r == 'api'){
            var select = {
                api_key: _req.params.key,
                workspace: _req.params.ws
            }
            UsersModel.findOne(select, function(err, ku){
                if (ku) {
                    var UK = ku.api_key;
                    console.log(UK);
                    if(_req.params.key == UK){
                        var WS = ku.workspace;
                        if(_req.params.ws == WS){
                            _res.end("LANJUUUTTT");
                        ///////////ISI///////////
                        
                        //////////////////////////
                        }else{
                            _res.redirect('/api');
                        }
                    }else{
                        _res.redirect('/api');
                    }
                } else {
                    _res.redirect('/api');
                }
            });
        }else{
            _res.redirect('/api');
        }
    });
        
    // *****Read By Parameter*****
    r.get('/:r/:key/:ws/r/:fn_ws', function(_req, _res){
        if(_req.params.r == 'api'){
            var select = {
                api_key: _req.params.key,
                workspace: _req.params.ws
            }
            UsersModel.findOne(select, function(err, ku){
                if (ku) {
                    var UK = ku.api_key;
                    console.log(UK);
                    if(_req.params.key == UK){
                        var WS = ku.workspace;
                        if(_req.params.ws == WS){
                            //_res.end("LANJUUUTTT");
                        ///////////ISI///////////
							if (_req.params.fn_ws == 'companies'){
								var url_path = url.parse(_req.url, true);
									compModel.find(url_path, function(err, comps){
									if(!err){
										console.log(comps);
									}else{
										_res.end("data kosong");
										return console.log(err);
									}
								});
							} else {
								_res.end('salah');
							}
                        //////////////////////////
                        }else{
                            _res.redirect('/api');
                        }
                    }else{
                        _res.redirect('/api');
                    }
                } else {
                    _res.redirect('/api');
                }
            });
        }else{
            _res.redirect('/api');
        }
    });
    
    // *****Create data*****
    r.post('/:r/:key/:ws/c/:fn_ws', function(_req, _res){
        if(_req.params.r == 'api'){
            var select = {
                api_key: _req.params.key,
                workspace: _req.params.ws,
            }
            UsersModel.findOne(select, function(err, ku){
                if (ku) {
                    var UK = ku.api_key;
                    console.log(UK);
                    if(_req.params.key == UK){
                        var WS = ku.workspace;
                        if(_req.params.ws == WS){
                            //_res.end("LANJUUUTTT");
                        ///////////ISI///////////
		                    if(_req.params.fn_ws == 'companies'){
								company = new compModel({
									init_company: _req.body.init_company,
									nama_company: _req.body.nama_company,
									alamat_company: _req.body.alamat_company,
									no_telp: _req.body.no_telp,
									deskripsi_company: _req.body.deskripsi_company
								});
								company.save(function(err){
									if(!err){
										//_res.redirect('/member');
										_res.end("DATA SAVE");
									}else{
										_res.redirect('/insert');
										_res.end("ERROR");
									};
								});
							} else {
								_res.redirect('/api');
							};
                        //////////////////////////
                        }else{
                            _res.redirect('/api');
                        };
                    }else{
                        _res.redirect('/api');
                    };
                } else {
                    _res.redirect('/api');
                };
            });
        }else{
            _res.redirect('/api');
        }
    });
    
    // *****Update Data*****
    r.put('/:r/:key/:ws/u/:fn_ws', function(_req, _res){
        if(_req.params.r == 'api'){
            var select = {
                api_key: _req.params.key,
                workspace: _req.params.ws
            }
            UsersModel.findOne(select, function(err, ku){
                if (ku) {
                    var UK = ku.api_key;
                    console.log(UK);
                    if(_req.params.key == UK){
                        var WS = ku.workspace;
                        if(_req.params.ws == WS){
                            //_res.end("LANJUUUTTT");
                        ///////////ISI///////////
		                    if(_req.params.fn_ws == 'companies'){
								var url_path = url.parse(_req.url, true);
								return compModel.findOne(url_path, function(err, comps){
									if(!err){
										comps.init_company = _req.body.init_company,
										comps.nama_company = _req.body.nama_company,
										comps.alamat_company = _req.body.alamat_company,
										comps.no_telp = _req.body.no_telp,
										comps.description_company = _req.body.description_company
										comps.save(function(error){
											if(!error){
												return _res.end("USERS UPDATE");
											}else{
												console.log(error);
												_res.end("ERROR");
											}
										});
									}else{
										console.log(err);
									}
								});
							} else {
								_res.redirect('/api');
							}
                        //////////////////////////
                        }else{
                            _res.redirect('/api');
                        }
                    }else{
                        _res.redirect('/api');
                    }
                } else {
                    _res.redirect('/api');
                }
            });
        }else{
            _res.redirect('/api');
        }
    });
    
    // *****Remove Data*****
        r.delete('/:r/:key/:ws/d/:fn_ws', function(_req, _res){
        if(_req.params.r == 'api'){
            var select = {
                api_key: _req.params.key,
                workspace: _req.params.ws
            }
            UsersModel.findOne(select, function(err, ku){
                if (ku) {
                    var UK = ku.api_key;
                    console.log(UK);
                    if(_req.params.key == UK){
                        var WS = ku.workspace;
                        if(_req.params.ws == WS){
                            //_res.end("LANJUUUTTT");
                        ///////////ISI///////////
                            if(_req.params.fn_ws == 'companies'){
								var url_path = url.parse(_req.url, true);
								return dataModel.findOne(url_path, function(err, data){
								  if (!err){
									return data.remove(function(error){
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
							} else {
								_res.redirect('/api');
							}
                        //////////////////////////
                        }else{
                            _res.redirect('/api');
                        }
                    }else{
                        _res.redirect('/api');
                    }
                } else {
                    _res.redirect('/api');
                }
            });
        }else{
            _res.redirect('/api');
        }
    });

///////////////////////////////////////////////////////////////////////
};

var connRoute = connectRoute(route);

var routing = {
    fnRoute: route,
    doRoute: connRoute
};

exports.router = routing;
