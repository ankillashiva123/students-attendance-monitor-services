'use strict';
var mongoose = require('mongoose'),
   jwt = require('jsonwebtoken'),
   bcrypt = require('bcrypt'),
   User = mongoose.model('User');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ankillashiva123@gmail.com',
    pass: 'Shiva@7799'
  }
});
   
exports.register = function(req,res){

    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
      if (err) {
        return res.status(400).send({
          message: err
        });
      } else {
        user.hash_password = undefined;

        var mailOptions = {
          from: 'ankillashiva123@gmail.com',
          to: req.body.email,
          subject: 'Attenance Monotoring System Login Credentials',
          text: 'Username:'+req.body.email+",passsword: "+req.body.password
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        return res.json(user);

      }
    });

};
exports.sign_in = function(req, res){
    User.findOne({
        email: req.body.email
      }, function(err, user) {
        if (err) throw err;
        if (!user) {
          res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
          if (!user.comparePassword(req.body.password)) {
            res.status(401).json({ message: 'Authentication failed. Wrong password.' });
          } else {
            return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, 'RESTFULAPIs')});
          }
        }
      });

};
exports.loginRequired = function(req, res){

    if (req.user) {
        next();
      } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
      }
};