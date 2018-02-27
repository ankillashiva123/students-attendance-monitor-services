'use strict';
module.exports = function(app) {
  var studentList = require('../controllers/studentListController'),
  userHandlers = require('../controllers/userController.js');
  
  // studentList Routes
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.route('/studentsList')
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
};