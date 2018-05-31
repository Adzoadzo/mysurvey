const express = require('express');
const bodyparser = require("body-parser");
const app = express();
const MongoClient = require('mongodb').MongoClient;
const jwt_secret = 'WU5CjF8fHxG40S2t7oyk';

var jwt    = require('jsonwebtoken');
var MongoId = require('mongodb').ObjectID;
var db;

app.use('/', express.static('examples'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.post('/login', function(request, response){
    var user = request.body;
  
    db.collection("users").findOne({'username': user.username, 'password': user.password}, function(error, user) {
      if (error){
        throw error;
      }else{
        if(user){
          var token = jwt.sign(user, jwt_secret, {
            expiresIn: 20000 
          });
      
          response.send({
            success: true,
            message: 'Authenticated',
            token: token
          })
        }else{
          response.status(401).send('Credentials are wrong.');
        }
      }
    });
  });

app.use('/', express.static('examples'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/getSurvey', function(request, response) {
    db.collection('surveys').find().toArray((err, surveys) => {
        if (err) return console.log(err);
        response.setHeader('Content-Type', 'application/json');
        response.send(surveys);
    })
});

app.post('/addSurvey', function(req, res){
    req.body._id = null;
    var survey = req.body;
    db.collection('surveys').insert(survey, function(err, data){
        if(err) return console.log(err);
        res.setHeader('Content-Type', 'application/json');
        res.send(survey);
    })
});

app.put('/survey/:survey_id', function(req, res){    
    db.collection('surveys').findAndModify(
       {_id: new MongoId(req.params.survey_id)}, // query
       [['_id','asc']],  // sort order
       {$set : {survey_question: req.body.survey_question, survey_answer1: req.body.survey_answer1, survey_answer2: req.body.survey_answer2, 
           survey_answer3: req.body.survey_answer3, survey_category: req.body.survey_category}}, // replacement, replaces only the field "hi"
       function(err, doc) {
           if (err){
               console.warn(err.message);  // returns error if no matching object found
           }else{
               res.json(doc);
           }
       });
});

app.delete('/survey/:survey_id', function(req, res){
    db.collection('surveys').remove({_id: new MongoId(req.params.survey_id)},
    function(err, data){
        res.json(data);
    });
});

MongoClient.connect('mongodb://localhost:27017/mysurvey', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => console.log('Example app listening on port 3000!'))
})
