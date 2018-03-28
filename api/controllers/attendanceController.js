var Attendance = require('../models/attendance');
var moment = require('moment'); 
exports.markattendance = function(req, res) {
    Attendance.create(req.body, function (err, post) {
          if (err) {
            res.send(err);
            }
            res.send(post);
          });
};
exports.getallrecords = function(req, res) {
    Attendance.find(function(err, records) {
            if (err)
                res.send(err);
            var formattedrecords=[];
            for(var i = 0;i<records.length;i++){
              formattedrecords.push(
                {
                  "title":records[i].title,
                  "allDay":records[i].allDay,
                  "start":records[i].start,
                  "end":records[i].end
                }
              )
            }
            res.json(formattedrecords);
        });
  };
  exports.getbydate = function(req,res){
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
      //find all the record whose start & end date is between than starting & ending dates
    Attendance.find({start: {$gte: startDate},end:{$lte: endDate}},function(err, records) {
            if (err)
                res.send(err);
            var formattedrecords=[];
            for(var i = 0;i<records.length;i++){
              formattedrecords.push(
                {
                  "title":records[i].title,
                  "allDay":records[i].allDay,
                  "start":records[i].start,
                  "end":records[i].end
                }
              )
            }
            res.json(formattedrecords);
        });
  }
  