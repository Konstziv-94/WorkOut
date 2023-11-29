const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const armsSchema = new Schema({
    name:{
        type:String,
        require:true
    }
})



module.exports = mongoose.model('Arms',armsSchema);