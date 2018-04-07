'use strict';
module.exports = function (app) {
  var studentList = require('../controllers/studentListController'),
    userHandlers = require('../controllers/userController.js'),
    fileUpload = require('../controllers/fileController'),
    bodyParser = require('body-parser');
  var attendance = require('../controllers/attendanceController');

  app.use(bodyParser.json());
  // studentList Routes
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,GET");
    next();
  });
  app.route('/studentsList/:classId')
    .get(studentList.list_all_students)
    .post(studentList.add_a_student);

  app.route('/students/:rollNumber')
    .get(studentList.read_a_student)
    .put(studentList.update_a_student)
    .delete(studentList.delete_a_student);

  app.route('/messege/:rollNumber/content/:content')
    .post(studentList.sendMessage);

  app.route('/auth/register')
    .post(userHandlers.register);

  app.route('/auth/sign_in')
    .post(userHandlers.sign_in);
  app.route('/upload')
    .post(fileUpload.fileUpload);

  app.route('/report')
    .post(attendance.markattendance);

  app.route('/getAttendance/:classId')
    .get(attendance.getStudentsPercentage);


};