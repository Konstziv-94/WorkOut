const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// SOS SOS SOS SOS SOS
// gia na piasw to error prepei na kanw required
const blogSchema = new Schema({
    title:{
        type:String,
        // required: [true,'Title can not be blank']   
    },
    text:{
        type:String,
        // required : [true,'Text can not be blank']
    },
    image:{
        type:String
    },
    filename:{
        type:String
    },
    cloudinary_id:{
        type:String
    },   
})




 module.exports = mongoose.model('Blog',blogSchema);

