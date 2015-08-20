//CALL PACKAGES
//var User = require('./app/models/user');
var express			= require('express');
var app 				= express();
var bodyParser 	= require('body-parser');
var morgan			= require('morgan');
var mongoose		= require('mongoose');
var path				=	require('path');
//var port 				= process.env.PORT || 8080;
//var jwt					=	require('jsonwebtoken');
//var superSecret = 'StarwarsStarTrekAndMarvelMovies';
var config			=	require('./config');

//connect to DB on mongolab
mongoose.connect(config.database);


//APP CONFIG
//use bodyParser to grab info from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//configure to handle cross-site HTTP request.
//this allows any domain to access the API.
app.use(function(request, response, next){
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

//log all request to console
app.use(morgan('dev'));


//for frontend request
app.use(express.static(__dirname + '/public'));

//API ROUTES
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

//root route
app.get('*', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});



//START SERVER and listen on console
app.listen(config.port);
console.log('Fonos Node App is on port ' + config.port);