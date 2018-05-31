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


MongoClient.connect('mongodb://localhost:27017/mysurvey', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => console.log('Example app listening on port 3000!'))
})
