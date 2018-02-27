
'use strict';
var mongoose= require('mongoose'),
 bcrypt = require('bcrypt'),
Schema = mongoose.Schema;

var userSchema= new Schema({

    fullName:{
        type : String,
        trim : true,
        required:true

    },
    email:{
        type : String,
        trim : true,
        unique:true,
        lowercase:true,
        required:true

    },
    hash_password:{
        type : String,
        required:true

    },
    created:{
        type:Date,
        default:Date.now
    }

});
userSchema.methods.comparePassword = function(password)
{
    return bcrypt.compareSync(password,this.hash_password);
};
    mongoose.model('User',userSchema);