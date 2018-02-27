var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Student = require('./api/models/studentListModel'), //created model loading here
  bodyParser = require('body-parser'),
  jsonwebtoken= require('jsonwebtoken'),
   User = require('./api/models/userModel');
//jsonwebtoken = require("jsonwebtoken");
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Studentdb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req,res,next){

if(req.headers && req.headers.authorization && req.headers.authorization.split('')[0]=='jwt'){
jsonwebtoken.verify(req.headers.authorization.split('')[1],'RESTFULAPIs',function(err,decode){
  if(err) {
  require.user=undefined;}
  req.user =decode;
  next();
});
} else {
  req.user= undefined;
  next();
}
});

var studentListRoutes = require('./api/routes/studentListRoutes'); //importing route
studentListRoutes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
