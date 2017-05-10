var express = require('express');
var app = express();
var  mongojs = require('mongojs');
var db = mongojs('mongodb://akash:Akash%401993@ds159670.mlab.com:59670/contactsdb', ['ContactsDB']);
var bodyParser = require('body-parser');
//-------------------------------------------------

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactList', function(req,res){
	console.log('I Recieved a get request.');

    db.ContactsDB.find(function(err, docs){
    	res.json(docs);
    });

});

app.get('/contactList/:id', function(req, res){
	var id = req.params.id;
	db.ContactsDB.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});

});

app.post('/contactList', function(req, res){
	console.log(req.body);
	db.ContactsDB.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

app.put('/contactList/:id', function(req, res){
	var id = req.params.id;
	db.ContactsDB.findAndModify({
		query: {
			_id: mongojs.ObjectId(id)
		},
		update: {
			$set: {
				name: req.body.name, 
				email: req.body.email,
				number: req.body.number
			}
		},
		new: true
		},
		function(err, doc){
			res.json(doc);
		}
	);
});

app.delete('/contactList/:id', function(req,res){
	var id = req.params.id;
	db.ContactsDB.remove({_id: mongojs.ObjectId(id)}, 
		function(err, doc){
			res.json(doc);
		});
});

app.listen(process.env.PORT || 3000);

console.log('Server running on port 3000.');