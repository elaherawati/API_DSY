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
        res.render('page/index.html', { url: req.url });
    });
    
    // Routing
    r.get('/:r', function (req, res, next) {
        switch (req.params.r) {
            case 'api'      :   res.render('api/index.html', { url: req.url });
                                break;
            
            case 'login'    :   res.render('page/login.html', { url: req.url });
                                break;
                            
            case 'signup'   :   res.render('page/signup.html', { url: req.url });
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
                                    res.render('page/member.html', {username: req.session.username}, { url: req.url });
                                }
                                break;
                            
            case 'insert'   :   if (!req.session.username) {
                                    // If false
                                    res.redirect('/');
                                }else{
                                    res.render('page/insert.html', {username: req.session.username}, { url: req.url });
                                }
                                break;
        }
    });
    
    // Sign Up
    r.post('/signup/proses', function(_req, _res){
        var user;
        user = new UsersModel({
            username: _req.body.username,
            password: _req.body.password,
            group_id: _req.body.group_id,
            api_key: _req.body.api_key,
            workspace: _req.body.workspace,
            email: _req.body.email
        });
        user.save(function(err){
            if(!err){
                _res.end("USER SAVE");
                _res.redirect('/');
            }else{
                _res.end("ERROR");
            };
        }); 
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
///////////////////////////////////////////////////////////////////////    
        // Read Activation
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
        
    // Read By Parameter
    r.get('/:r/:key/:ws/g', function(_req, _res){
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
                            var url_path = url.parse(_req.url, true);
                                dataModel.find(url_path, function(err, data){
                                if(!err){
                                    console.log(data);
                                    _res.end(data.warna, data.ukuran, data.merk, data.jenis);
                                }else{
                                    _res.end("data kosong");
                                    return console.log(err);
                                }
                            });
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
    
    //Insert data
    r.post('/:r/:key/:ws/i', function(_req, _res){
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
                            data = new dataModel({
                                warna: _req.body.warna,
                                ukuran: _req.body.ukuran,
                                merk: _req.body.merk,
                                jenis: _req.body.jenis
                            });
                            data.save(function(err){
                                if(!err){
                                    _res.end("DATA SAVE");
                                }else{
                                    _res.end("ERROR");
                                };
                            });
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
    
    // Update Data
    r.put('/:r/:key/:ws/u', function(_req, _res){
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
                            var url_path = url.parse(_req.url, true);
                            return dataModel.findOne(url_path, function(err, data){
                                if(!err){
                                    data.warna = _req.body.warna,
                                    data.ukuran = _req.body.ukuran,
                                    data.merk = _req.body.merk,
                                    data.jenis = _req.body.jenis
                                    data.save(function(error){
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
    
    //Remove Data
        r.delete('/:r/:key/:ws/d', function(_req, _res){
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
