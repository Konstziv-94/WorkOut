const { number } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findOrCreate');
const passportLocalMongoose = require('passport-local-mongoose');



const userSchema = Schema({
    password:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    sex:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true,
    },
    googleId:{
        type:String,
    },
    role: { type: String, enum: ['admin', 'user'], required: true },
    days:{type:Number, "default": 1,},
    program:{type:Number, "default" :6},
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);




// ,
// facebookId:{
//     type:String,
// }