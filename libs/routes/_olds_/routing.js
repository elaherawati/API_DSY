var http = require('http');
var connect = require('connect');
var routeHandle = require('./reshandle');

var app = connect();

app.use(routeHandle.router.doRoute);

var server = http.createServer(app).listen(8899);