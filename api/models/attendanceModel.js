var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var AttendanceSchema   = new Schema({
    class:{type:sting},
    day:{type:Date,required:true},
    absenties:{}

    
});
 
module.exports = mongoose.model('Attendance', AttendanceSchema);