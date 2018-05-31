const express = require('express');
const bodyparser = require("body-parser");
const app = express();
const MongoClient = require('mongodb').MongoClient;
var MongoId = require('mongodb').ObjectID;




MongoClient.connect('mongodb://localhost:27017/mysurvey', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => console.log('Example app listening on port 3000!'))
})
