'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var StudentSchema = new Schema({
firstName: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  secondName: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  department: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  rollNumber: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  mailId: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  emergencyContact: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  Contact: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
}
});

module.exports = mongoose.model('Students', StudentSchema);