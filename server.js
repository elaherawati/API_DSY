var http = require('http'),
	connect = require('connect'),
	redirect = require('connect-redirection'),
	routeHandle = require('./libs/routes/reshandle');

var app = connect(
	render({
		root: __dirname + '/public',
		layout: false,
		cache: true // `false` for debug
	})
);

app.use(connect.bodyParser());
app.use(connect.cookieParser());
app.use(connect.session({ secret: 'sga'}));
app.use(redirect());
app.use(routeHandle.router.doRoute);

var server = http.createServer(app).listen(8899, function () {
	console.log("Server listening on port 8899...");
});