const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.COUDINARY_SECRET
});


//cloudinary-storage

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
            folder: 'work',
            allowedFormats: ['jpeg' , 'png' , 'jpg']
    }
});
  

module.exports={
    cloudinary,
    storage, 
}