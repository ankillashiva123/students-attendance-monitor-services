'use strict';

var mongoose = require('mongoose'),
  Student = mongoose.model('Students');
  var twilio = require('twilio');
  
 
  
exports.list_all_students = function (req, res) {
 
  Student.find({}, function (err, student) {
    if (err)
      res.send(err);
    res.json(student);
  });
};

exports.add_a_student = function (req, res) {
  
 
  var new_student = new Student(req.body);
  new_student.save(function (err, student) {
    if (err)
      res.send(err);
    res.json(student);
  });
};


exports.read_a_student = function (req, res) {
  console.log(req.params);
  Student.findOne({"rollNumber" : req.params.rollNumber}, function (err, student) {
    if (err)
      res.send(err);
    res.json(student);
  });
};
exports.sendMessage = function (req, res) {
  Student.findOne({"rollNumber" : req.params.rollNumber}).then(student => {
    var contact = student.Contact;
 console.log(contact);
// Find your account sid and auth token in your Twilio account Console.
var client = new twilio('ACf9a5ac5acf23f02d6e846a84cd07812b', 'a9b2a7c0893f8ce04177939980b8ed0d');
 
// Send the text message.
client.messages.create({
  to: '+91'+ contact,
  from: '+12015002297',
  body: 'Hello from Twilio!'
  });
    res.json(student);
    console.log(student);
  });
};


exports.update_a_student = function (req, res) {
  Student.findOneAndUpdate({ _id: req.params.rollNumber }, req.body, { new: true }, function (err, student) {
    if (err)
      res.send(err);
    res.json(student);
  });
};


exports.delete_a_student = function (req, res) {


  Student.remove({
    _id: req.params.studentId
  }, function (err, student) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};


