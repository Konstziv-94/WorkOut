const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const legsSchema = new Schema({
    name:{
        type:String,
        require:true
    }
});





module.exports = mongoose.model('Legs',legsSchema);