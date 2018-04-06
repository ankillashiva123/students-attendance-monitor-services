'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StudentSchema = new Schema({
firstName: {
    type: String,
    required: 'Kindly enter the firstName'
  },
  secondName: {
    type: String,
    required: 'Kindly enter the secondName'
  },
  classId: {
    type: Number,
    default:null
  },
  department: {
    type: String,
    required: 'Kindly enter the departmentk'
  },
  rollNumber: {
    type: String,
    required: 'Kindly enter the rollNumber'
  },
  mailId: {
    type: String,
    required: 'Kindly enter the mailId'
  },
  emergencyContact: {
    type: String,
    
  },
  Contact: {
    type: String,
    required: 'Kindly enter theContact'
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model('Students', StudentSchema);