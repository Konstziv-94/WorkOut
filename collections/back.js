const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const backSchema = new Schema({
    name:{
        type:String,
        require:true
    }
})



module.exports = mongoose.model('Back',backSchema);