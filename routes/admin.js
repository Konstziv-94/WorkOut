const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError =  require('../utils/ExpressError');
const passport = require('passport');
const User =  require('../collections/users');
const Blog = require('../collections/blog');
const Legs = require('../collections/legs');
const Chest = require('../collections/chest');
const Arms =  require('../collections/arms');
const Abs = require('../collections/abs');
const Back = require('../collections/back');
const {isLoggedIn} = require('../midleware');
const multer  = require('multer');
const {storage, cloudinary} = require('../cloudinary');



const upload = multer({ storage });



router.post('/admin/blogs/new',upload.single('image'),catchAsync(async(req,res)=>{
    if(req.user.role==='user'){
        res.redirect('/login');
    }else if(req.user.role==='admin'){
        const {title,text} = req.body.blog;
        
        
        const result = await cloudinary.uploader.upload(req.file.path);

        const path = req.file.path;
        const filename = req.file.filename;

        const blog = new Blog({
            title:title,
            text:text,
            image:path,
            filename:filename,
            cloudinary_id:result.public_id
        });
        
        console.log(result.public_id);
        

        await blog.save();
        console.log(blog);
           
           
        req.flash('succes','New Blog');
        res.redirect('/admin/blogs');
    }

}));


router.delete('/admin/blogs/:id/delete',catchAsync(async(req,res)=>{
    if(req.user.role==='user'){
        res.redirect('/login');
    }else if(req.user.role==='admin'){
        const {id} = req.params;

        const blog = await Blog.findById(id);
        await Blog.findByIdAndDelete(id);
       
        // prepei destry kai to filename kai to cloudinary id
        await cloudinary.uploader.destroy(blog.filename);
        await cloudinary.uploader.destroy(blog.cloudinary_id);
        console.log();

        
         req.flash('succes','Blog deleted')
          res.redirect('/admin/blogs')
    }
    
}))




router.get('/admin/login',(req,res)=>{
    res.render('admin/login')
})

router.post('/admin/login',passport.authenticate('local', { failureFlash:true,   failureRedirect: '/admin/login' }),(req,res)=>{

    if(req.user.role==='user'){
        res.redirect('/login');
    }else if(req.user.role==='admin'){
        passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
        req.flash('success', 'Welcome Admin');
        res.redirect('/admin/users');  
    }

})


router.get('/admin/users',catchAsync(async(req,res)=>{
    if(req.user.role==='user'){
        res.redirect('/login');
    }else if(req.user.role==='admin'){
        const users = await User.find({})
        res.render('admin/users',{users})
    }
})
)



router.get('/admin/logout',(req,res)=>{
    req.logout();
    req.flash('success', 'Bye Bye Admin');
    res.redirect('/admin/login');
})

router.get('/admin/users/new',(req,res)=>{
    if(req.user.role==='user'){
        res.redirect('/login');
    }else if(req.user.role==='admin'){
        res.render('admin/new');
    }
   
})

router.post('/admin/users/new',catchAsync(async(req,res)=>{
    if(req.user.role==='user'){
        res.redirect('/login');
    }else if(req.user.role==='admin'){
        const {username,password,age,email,sex,role} = req.body.user;
        const user = new User({
            username:username,
            sex:sex,
            email:email,
            age:age,
            role: role
        })
     
         const registerUser = await User.register(user,password);
         console.log(registerUser);
         req.flash('success', 'Succesfull make new user');
         res.redirect('/admin/users');
    }
   
   
  
}))

router.get('/admin/users/:id',catchAsync(async(req,res)=>{
    if(req.user.role==='user'){
        res.redirect('/login');
    }else if(req.user.role==='admin'){ 
        const {id} = req.params;
        const users = await User.findOne({_id:id})
        res.render('admin/edit',{users})
    }
   
}))

router.put('/admin/users/:id/edit',catchAsync(async(req,res)=>{
    if(req.user.role==='user'){
        res.redirect('/login');
    }else if(req.user.role==='admin'){
        const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, { ...req.body.User });
    console.log(user);
    req.flash('success', 'Succesfull edit user');
    res.redirect(`/admin/users/${user._id}`)
    }
   
}))

router.delete('/admin/users/:id/delete',catchAsync(async(req,res)=>{

    if(req.user.role==='user'){
        res.redirect('/login');
    }else if(req.user.role==='admin'){
    const {id} = req.params;
    await User.findByIdAndDelete(id);
    req.flash('succes','User deleted')
    res.redirect('/admin/users');
    }


    
}))

router.get('/admin/blogs',catchAsync(async(req,res)=>{

    if(req.user.role==='user'){
        res.redirect('/login');
    }else if(req.user.role==='admin'){
       const blogs = await Blog.find({})
     res.render('admin/blogs',{blogs})
    }
    
}))


router.get('/admin/blogs/new',(req,res)=>{
    if(req.user.role==='user'){
        res.redirect('/login');
    }else if(req.user.role==='admin'){
        res.render('admin/newblog')
    }
    
})


router.get('/admin/blogs/:id',catchAsync(async(req,res)=>{
    if(req.user.role==='user'){
        res.redirect('/login');
    }else if(req.user.role==='admin'){
       const {id} = req.params;
    const blog = await Blog.findOne({_id:id})
    res.render('admin/editblog',{blog})
    
    }
  
}))

router.put('/admin/blogs/:id/edit',catchAsync(async(req,res)=>{
    if(req.user.role==='user'){
        res.redirect('/login');
    }else if(req.user.role==='admin'){
         const {id} = req.params;
         const blogs = await Blog.findById(id);
         console.log(blogs.cloudinary_id);
        const blog = await Blog.findByIdAndUpdate(id,{...req.body.Blog})
        req.flash('succes','blog edit')
        res.redirect(`/admin/blogs/${blog._id}`)
    }
   
}))



router.get('/admin/exercise',(req,res)=>{
    res.render('admin/exercise');
})

router.post('/admin/exercise',(async(req,res)=>{
    const {name,body} = req.body;
    console.log(body);
    if(body==="legs"){

    const leg = new Legs ({

        name:name
       })
      await leg.save();  

    }else if(body==="chest"){

        const chest = new Chest({
            name:name
        })
        await chest.save();

    }else if(body==="arms"){

        const arms =  new Arms({
            name:name
        })
        await arms.save();
    }else if(body==="abs"){

        const abs = new Abs({
            name:name
        })
        await  abs.save();
    }else if(body==="back"){

        const back = new Back({
            name:name
        })
        await   back.save();
    }

    res.redirect('/admin/exercise')
}))


module.exports = router;