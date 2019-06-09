var path = require('path');
var express= require('express');
var express_handlebars = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;

//app.engine('handlebars', express_handlebars({defaultLayout: 'main'}));
app.engine('handlebars', express_handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function(req, res, next){
	res.status(200).render('home');
});

app.get('/home', function(req, res, next){
        res.status(200).render('home');
});

app.get('/plans', function(req, res, next){
        res.status(200).render('plans');
});

app.get('/create', function(req, res, next){
        res.status(200).render('create');
});

app.get('*', function(req, res, next){
        res.status(404).render('404');
});

app.listen(port, function (){
	console.log("==server listening on port", port);
});
