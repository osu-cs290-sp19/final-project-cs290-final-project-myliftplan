var path = require('path');
var express= require('express');
var express_handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var port = process.env.PORT || 3000;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`;
var db = null;

//app.engine('handlebars', express_handlebars({defaultLayout: 'main'}));
app.engine('handlebars', express_handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function(req, res, next){
	res.status(200).render('home');
});

app.get('/home', function(req, res, next){
        res.status(200).render('home');
});

app.get('/plans', function(req, res, next){
    var collection = db.collection('workouts');
    collection.find({}).toArray(function(err, workouts){
    	if (err){
    		res.status(500).send({
    			error: "Error fetching workouts from DB"
    	});
    	} else {
    		console.log("== workouts:", workouts);
    		res.status(200).render('plans',{
    			workouts: workouts
    		});
    	}
    });
});

app.get('/plans/:title', function(req, res, next){
    var title = req.params.title;
    var collection = db.collection('workouts');
    collection.find({ title: title }).toArray(function (err, workouts) {
        if (err) {
            res.status(500).send({
                error: "Error fetching workouts from DB"
            });
        } else if (workouts.length < 1) {
            next();
        } else {
            console.log("== workouts:", workouts);
            res.status(200).render('create', workouts[0]);
        }
    });
});

app.post('/plans/:title/editPlan', function(req, res, next) {
    var i;
    var title = req.params.title;
    if(req.body && req.body.muscle && req.body.liftName && req.body.sets && req.body.reps && req.body.rest && req.body.unit) {
        var collection = db.collection('workouts');
        var liftsArray = [];
        for(i = 0; i < req.body.muscle.length; i++)
        {
            liftsArray.push({
                muscle: req.body.muscle[i],
                liftName: req.body.liftName[i],
                sets: req.body.sets[i],
                reps: req.body.reps[i],
                rest: req.body.rest[i],
                unit: req.body.unit[i]
            });
        }
        
        collection.updateOne(
            { title_id: title },
            { $set: { lifts: liftsArray } },
            function (err, result) {
                if (err) {
                res.status(500).send({
                    error: "Error inserting lift row into DB"
                });
                } else {
                    console.log("== update result:", result);
                    if (result.matchedCount > 0) {
                        res.status(200).send("Success");
                    } else {
                        next();
                    }
                }
            }
        );   
    } else {
        res.status(400).send("Request Error")
    }

});

app.get('/about', function(req,res,next) {
    res.status(400).render('about');
});

app.get('*', function(req, res, next){
        res.status(404).render('404');
});

MongoClient.connect(mongoUrl,{useNewUrlParser: true}, function(err, client){
	if (err){
		throw err;
	}

	db = client.db(mongoDBName);
	
	app.listen(port, function (){
		console.log("==server listening on port", port);
	});
});

