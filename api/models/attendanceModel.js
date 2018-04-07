var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AttendanceSchema = new Schema({
    class: { type: Number 
    },
    day: {
        type: Date,
        default: Date.now,
        unique: true
    },
    absenties:  [{type: String
    }]
});

module.exports = mongoose.model('Attendance', AttendanceSchema);