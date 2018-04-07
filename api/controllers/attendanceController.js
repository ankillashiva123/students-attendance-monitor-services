var Attendance = require('../models/attendanceModel');
var mongoose = require('mongoose');
var moment = require('moment');
Attendance = mongoose.model('Attendance');
exports.markattendance = function (req, res) {

  console.log(req.body);

  var array = req.body.absenties;


  var data = {
    "class": req.body.class,
    "absenties": array
  };
  console.log(data);

  var new_student = new Attendance(data);
  new_student.save(function (err, student) {
    if (err)
      res.send(err);
    console.log(student);
    res.json(student);
  });
};
exports.getStudentsPercentage = function (req, res) {
  console.log(req.query);
  console.log(req.params);
  var startDate = req.query.start_date ? new Date(req.query.start_date) : new Date();
  var endDate = req.query.end_date ? new Date(req.query.end_date) : new Date();
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 0);
  var classId = Number(req.params.classId);
  console.log(startDate);
  console.log(endDate);
  Attendance.find({
    'class': classId,
    'day': {
      '$gte': startDate,
      '$lte': endDate
    }
  }, function (err, records) {
    var absentiesMapping = {};
    if (err)
      res.send(err);
    var totalPresentDays = records.length;
    console.log(records);
    for (i = 0; i <= records.length; i++) {
      var record = records[i];
      console.log(record);
      if(record){
        for (j = 0; j <= record.absenties.length; j++) {
          if(absentiesMapping[record.absenties[j]]){
             absentiesMapping[record.absenties[j]].noOfAbsentDays = absentiesMapping[record.absenties[j]].noOfAbsentDays + 1;
          }
          else {
            absentiesMapping[record.absenties[j]] = {};
            absentiesMapping[record.absenties[j]].noOfAbsentDays = 1;
          }
        }
      }
    }
    var studentsPercentage = [];
    for (var key in absentiesMapping) {
      console.log(key, absentiesMapping[key]);
      
      var percentage = totalPresentDays > 0 ? 
          ((absentiesMapping[key].noOfAbsentDays)/(totalPresentDays)) * 100 : 0;

      studentsPercentage.push({
        studentId: key,
        noOfAbsentDays: absentiesMapping[key].noOfAbsentDays,
        totalWorkingDays: totalPresentDays,
        percentage : percentage 
      })
    }
    console.log(studentsPercentage);
    //{studentId: 12345, percentage: 80%}
    //
    res.json(studentsPercentage);
  });
};
exports.getbydate = function (req, res) {

  //find all the record whose start & end date is between than starting & ending dates
  Attendance.find({ start: { $gte: startDate }, end: { $lte: endDate } }, function (err, records) {
    if (err)
      res.send(err);


    res.json(records);
  });
}
