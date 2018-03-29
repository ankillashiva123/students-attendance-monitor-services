var Attendance = require('../models/attendanceModel');
var mongoose = require('mongoose');
var moment = require('moment');
Attendance = mongoose.model('Attendance');
exports.markattendance = function (req, res) {
  console.log(req.body);
  var new_student = new Attendance(req.body);
  new_student.save(function (err, student) {
    if (err)
      res.send(err);
    res.json(student);
  });
};
exports.getallrecords = function (req, res) {
  Attendance.find(function (err, records) {
    if (err)
      res.send(err);
    
    res.json(formattedrecords);
  });
};
exports.getbydate = function (req, res) {
  var startDate = req.body.startDate;
  var endDate = req.body.endDate;
  //find all the record whose start & end date is between than starting & ending dates
  Attendance.find({ start: { $gte: startDate }, end: { $lte: endDate } }, function (err, records) {
    if (err)
      res.send(err);
    
    
    res.json(formattedrecords);
  });
}
