const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const chestSchema = new Schema({
    name:{
        type:String,
        require:true
    }
})


module.exports = mongoose.model('Chest',chestSchema);