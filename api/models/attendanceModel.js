var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AttendanceSchema = new Schema({
    class: { type: String 
    },
    day: {
        type: Date,
        default: Date.now,
        unique: true
    },
    absenties: []


});

module.exports = mongoose.model('Attendance', AttendanceSchema);