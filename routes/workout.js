const express = require('express');
const router = express.Router();
const Blog = require('../collections/blog');
const {isLoggedIn} = require('../midleware');
const catchAsync = require('../utils/catchAsync');
const ExpressError =  require('../utils/ExpressError');
const passport = require('passport');
const User =  require('../collections/users');
const { userSchema } = require('../schema');
const sendMail = require('../mail.js');
const Legs = require('../collections/legs');
const Chest = require('../collections/chest');
const Arms =  require('../collections/arms');
const Abs = require('../collections/abs');
const Back = require('../collections/back');
const { result } = require('lodash');




//joi
const validateUser = (req,res,next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
};


router.get('/',(req,res)=>{
    res.render('page/home');
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ["profile","email"] })
);

router.get("/auth/google/workout",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    req.flash('success', 'welcome back!');
    res.redirect("/program");
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/myapp',
  passport.authenticate('facebook', { successRedirect: '/',failureRedirect: '/login' }));


router.get('/about',(req,res)=>{
    res.render('page/about');
});


router.get('/login',(req,res)=>{
    res.render('page/login');
});

router.post('/login', passport.authenticate('local', { failureFlash:true,   failureRedirect: '/login' }),(req,res)=>{
    if(!req.user){
        passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
    }else{

        req.flash('success', 'Welcome');
        res.redirect('/program');
    }
});



router.get('/register',(req,res)=>{
    res.render('page/register');
});

router.post('/register',validateUser,catchAsync(async(req,res,next)=>{
   try{
        const {username,password,age,email,sex} = req.body;
        const user = new User({
            username:username,
            sex:sex,
            email:email,
            age:age,
            role:'user',
            days:1,
            program:6,
        })


            const registerUser = await User.register(user,password);
            req.flash('success', 'you succesfull register');
            console.log(registerUser);

        // otan  kanei register na ton stelnei sto program page
        req.login(user,err=>{
            if (err) {return next(err);}
            return res.redirect('/program');
        });


    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }


}));

router.get('/logout',catchAsync((async(req,res)=>{
    const user = await User.findByIdAndUpdate({_id:req.user._id},{days:1});
    user.save();
    req.logout();
    req.flash('success', 'you succesfull log out');
    res.redirect('/');
})));

router.get('/program',isLoggedIn,(req,res)=>{



    res.render('page/program')
});



router.post('/program',isLoggedIn,(async(req,res)=>{

  var {days} = req.body;
  var type = req.body.type;
  const user = await User.findByIdAndUpdate({_id:req.user._id},{days:days});
  const userPro = await User.findByIdAndUpdate({_id:req.user._id},{program:type});
  console.log(`the type is ${type}`);
 

   res.redirect('/download',);
}));


router.get("/download",isLoggedIn,(async(req,res)=>{

   const user = User.findById({_id:req.user._id});

   console.log(req.user.program);
   console.log(req.user.days);

   const programType = req.user.program;

 const day1 = [];
 const day2 = [];
 const day3 = [];
 const day4 = [];
 const day5 = [];
 const day6 = [];


    // console.log(req.user.days);
    if (req.user.days === 1){

    
    const total = await Arms.countDocuments();
    const skip = Math.floor(Math.random() * total) ;
    const randomDoc = await Arms.findOne({}).skip(skip).exec();

    day1.push(randomDoc.name);

    const totalAbs = await Abs.countDocuments();
    const skipAbs = Math.floor(Math.random() * totalAbs) ;
    const randomDocAbs = await Abs.findOne({}).skip(skipAbs).exec();

    day1.push(randomDocAbs.name);

    const totalLegs = await Legs.countDocuments();
    const skipLegs = Math.floor(Math.random() * totalLegs) ;
    const randomDocLegs = await Legs.findOne({}).skip(skipLegs).exec();

    day1.push(randomDocLegs.name);

    const totalChest = await Chest.countDocuments();
    const skipChest = Math.floor(Math.random() * totalChest) ;
    const randomDocChest = await Chest.findOne({}).skip(skipChest).exec();

    day1.push(randomDocChest.name);

    const totalBack = await Back.countDocuments();
    const skipBack = Math.floor(Math.random() * totalBack) ;
    const randomDocBack = await Back.findOne({}).skip(skipBack).exec();

    day1.push(randomDocBack.name);

    
        
    res.render('page/download',{fDay:day1,sDay:day2,tDay:day3,fourDay:day4,fifDay:day5,sixDay:day6,programType:programType});

    }else if(req.user.days===2){
    /////////////////////// DAY2

    // day 1 of 2
    const total = await Arms.countDocuments();
    const skip = Math.floor(Math.random() * total) ;
    const randomDoc = await Arms.findOne({}).skip(skip).exec();

    day1.push(randomDoc.name);

    const totalAbs = await Abs.countDocuments();
    const skipAbs = Math.floor(Math.random() * totalAbs) ;
    const randomDocAbs = await Abs.findOne({}).skip(skipAbs).exec();

    day1.push(randomDocAbs.name);

    const totalLegs = await Legs.countDocuments();
    const skipLegs = Math.floor(Math.random() * totalLegs) ;
    const randomDocLegs = await Legs.findOne({}).skip(skipLegs).exec();

    day1.push(randomDocLegs.name);

    const totalChest = await Chest.countDocuments();
    const skipChest = Math.floor(Math.random() * totalChest) ;
    const randomDocChest = await Chest.findOne({}).skip(skipChest).exec();

    day1.push(randomDocChest.name);

    const totalBack = await Back.countDocuments();
    const skipBack = Math.floor(Math.random() * totalBack) ;
    const randomDocBack = await Back.findOne({}).skip(skipBack).exec();

    day1.push(randomDocBack.name);

    //// day 2 of 2
    
    const total2 = await Arms.countDocuments();
    const skip2 = Math.floor(Math.random() * total2) ;
    const randomDoc2 = await Arms.findOne({}).skip(skip2).exec();

    day2.push(randomDoc2.name);

    const totalAbs2 = await Abs.countDocuments();
    const skipAbs2 = Math.floor(Math.random() * totalAbs2) ;
    const randomDocAbs2 = await Abs.findOne({}).skip(skipAbs2).exec();

    day2.push(randomDocAbs2.name);

    const totalLeg2 = await Legs.countDocuments();
    const skipLegs2 = Math.floor(Math.random() * totalLeg2) ;
    const randomDocLegs2 = await Legs.findOne({}).skip(skipLegs2).exec();

    day2.push(randomDocLegs2.name);

    const totalChest2 = await Chest.countDocuments();
    const skipChest2 = Math.floor(Math.random() * totalChest2) ;
    const randomDocChest2 = await Chest.findOne({}).skip(skipChest2).exec();

    day2.push(randomDocChest2.name);

    const totalBack2 = await Back.countDocuments();
    const skipBack2 = Math.floor(Math.random() * totalBack2) ;
    const randomDocBack2 = await Back.findOne({}).skip(skipBack2).exec();

    day2.push(randomDocBack2.name);

    res.render('page/download',{fDay:day1,sDay:day2,tDay:day3,fourDay:day4,fifDay:day5,sixDay:day6,programType:programType});

    }else if (req.user.days === 3){
      /////////////////////// DAY3

      
    // day 1 of 2
    const total = await Arms.countDocuments();
    const skip = Math.floor(Math.random() * total) ;
    const randomDoc = await Arms.findOne({}).skip(skip).exec();

    day1.push(randomDoc.name);

    const totalAbs = await Abs.countDocuments();
    const skipAbs = Math.floor(Math.random() * totalAbs) ;
    const randomDocAbs = await Abs.findOne({}).skip(skipAbs).exec();

    day1.push(randomDocAbs.name);

    const totalLegs = await Legs.countDocuments();
    const skipLegs = Math.floor(Math.random() * totalLegs) ;
    const randomDocLegs = await Legs.findOne({}).skip(skipLegs).exec();

    day1.push(randomDocLegs.name);

    const totalChest = await Chest.countDocuments();
    const skipChest = Math.floor(Math.random() * totalChest) ;
    const randomDocChest = await Chest.findOne({}).skip(skipChest).exec();

    day1.push(randomDocChest.name);

    const totalBack = await Back.countDocuments();
    const skipBack = Math.floor(Math.random() * totalBack) ;
    const randomDocBack = await Back.findOne({}).skip(skipBack).exec();

    day1.push(randomDocBack.name);

    //// day 2 of 2
    
    const total2 = await Arms.countDocuments();
    const skip2 = Math.floor(Math.random() * total2) ;
    const randomDoc2 = await Arms.findOne({}).skip(skip2).exec();

    day2.push(randomDoc2.name);

    const totalAbs2 = await Abs.countDocuments();
    const skipAbs2 = Math.floor(Math.random() * totalAbs2) ;
    const randomDocAbs2 = await Abs.findOne({}).skip(skipAbs2).exec();

    day2.push(randomDocAbs2.name);

    const totalLeg2 = await Legs.countDocuments();
    const skipLegs2 = Math.floor(Math.random() * totalLeg2) ;
    const randomDocLegs2 = await Legs.findOne({}).skip(skipLegs2).exec();

    day2.push(randomDocLegs2.name);

    const totalChest2 = await Chest.countDocuments();
    const skipChest2 = Math.floor(Math.random() * totalChest2) ;
    const randomDocChest2 = await Chest.findOne({}).skip(skipChest2).exec();

    day2.push(randomDocChest2.name);

    const totalBack2 = await Back.countDocuments();
    const skipBack2 = Math.floor(Math.random() * totalBack2) ;
    const randomDocBack2 = await Back.findOne({}).skip(skipBack2).exec();

    day2.push(randomDocBack2.name);




    // day 3 of 3

      const total3 = await Arms.countDocuments();
      const skip3 = Math.floor(Math.random() * total3) ;
      const randomDoc3 = await Arms.findOne({}).skip(skip3).exec();
  
      day3.push(randomDoc3.name);
  
      const totalAbs3 = await Abs.countDocuments();
      const skipAbs3 = Math.floor(Math.random() * totalAbs3) ;
      const randomDocAbs3 = await Abs.findOne({}).skip(skipAbs3).exec();
  
      day3.push(randomDocAbs3.name);
  
      const totalLeg3 = await Legs.countDocuments();
      const skipLegs3 = Math.floor(Math.random() * totalLeg3) ;
      const randomDocLegs3 = await Legs.findOne({}).skip(skipLegs3).exec();
  
      day3.push(randomDocLegs3.name);
  
      const totalChest3 = await Chest.countDocuments();
      const skipChest3 = Math.floor(Math.random() * totalChest3) ;
      const randomDocChest3 = await Chest.findOne({}).skip(skipChest3).exec();
  
      day3.push(randomDocChest3.name);
  
      const totalBack3 = await Back.countDocuments();
      const skipBack3 = Math.floor(Math.random() * totalBack3) ;
      const randomDocBack3 = await Back.findOne({}).skip(skipBack3).exec();
  
      day3.push(randomDocBack3.name);
    
      res.render('page/download',{fDay:day1,sDay:day2,tDay:day3,fourDay:day4,fifDay:day5,sixDay:day6,programType:programType});

    }else if(req.user.days === 4){

    
        /////////////////////// DAY4

            // day 1 of 2
    const total = await Arms.countDocuments();
    const skip = Math.floor(Math.random() * total) ;
    const randomDoc = await Arms.findOne({}).skip(skip).exec();

    day1.push(randomDoc.name);

    const totalAbs = await Abs.countDocuments();
    const skipAbs = Math.floor(Math.random() * totalAbs) ;
    const randomDocAbs = await Abs.findOne({}).skip(skipAbs).exec();

    day1.push(randomDocAbs.name);

    const totalLegs = await Legs.countDocuments();
    const skipLegs = Math.floor(Math.random() * totalLegs) ;
    const randomDocLegs = await Legs.findOne({}).skip(skipLegs).exec();

    day1.push(randomDocLegs.name);

    const totalChest = await Chest.countDocuments();
    const skipChest = Math.floor(Math.random() * totalChest) ;
    const randomDocChest = await Chest.findOne({}).skip(skipChest).exec();

    day1.push(randomDocChest.name);

    const totalBack = await Back.countDocuments();
    const skipBack = Math.floor(Math.random() * totalBack) ;
    const randomDocBack = await Back.findOne({}).skip(skipBack).exec();

    day1.push(randomDocBack.name);

    //// day 2 of 2
    
    const total2 = await Arms.countDocuments();
    const skip2 = Math.floor(Math.random() * total2) ;
    const randomDoc2 = await Arms.findOne({}).skip(skip2).exec();

    day2.push(randomDoc2.name);

    const totalAbs2 = await Abs.countDocuments();
    const skipAbs2 = Math.floor(Math.random() * totalAbs2) ;
    const randomDocAbs2 = await Abs.findOne({}).skip(skipAbs2).exec();

    day2.push(randomDocAbs2.name);

    const totalLeg2 = await Legs.countDocuments();
    const skipLegs2 = Math.floor(Math.random() * totalLeg2) ;
    const randomDocLegs2 = await Legs.findOne({}).skip(skipLegs2).exec();

    day2.push(randomDocLegs2.name);

    const totalChest2 = await Chest.countDocuments();
    const skipChest2 = Math.floor(Math.random() * totalChest2) ;
    const randomDocChest2 = await Chest.findOne({}).skip(skipChest2).exec();

    day2.push(randomDocChest2.name);

    const totalBack2 = await Back.countDocuments();
    const skipBack2 = Math.floor(Math.random() * totalBack2) ;
    const randomDocBack2 = await Back.findOne({}).skip(skipBack2).exec();

    day2.push(randomDocBack2.name);




    // day 3 of 3

      const total3 = await Arms.countDocuments();
      const skip3 = Math.floor(Math.random() * total3) ;
      const randomDoc3 = await Arms.findOne({}).skip(skip3).exec();
  
      day3.push(randomDoc3.name);
  
      const totalAbs3 = await Abs.countDocuments();
      const skipAbs3 = Math.floor(Math.random() * totalAbs3) ;
      const randomDocAbs3 = await Abs.findOne({}).skip(skipAbs3).exec();
  
      day3.push(randomDocAbs3.name);
  
      const totalLeg3 = await Legs.countDocuments();
      const skipLegs3 = Math.floor(Math.random() * totalLeg3) ;
      const randomDocLegs3 = await Legs.findOne({}).skip(skipLegs3).exec();
  
      day3.push(randomDocLegs3.name);
  
      const totalChest3 = await Chest.countDocuments();
      const skipChest3 = Math.floor(Math.random() * totalChest3) ;
      const randomDocChest3 = await Chest.findOne({}).skip(skipChest3).exec();
  
      day3.push(randomDocChest3.name);
  
      const totalBack3 = await Back.countDocuments();
      const skipBack3 = Math.floor(Math.random() * totalBack3) ;
      const randomDocBack3 = await Back.findOne({}).skip(skipBack3).exec();
  
      day3.push(randomDocBack3.name);


        // day 4 of 4
    
    const total4 = await Arms.countDocuments();
    const skip4 = Math.floor(Math.random() * total4) ;
    const randomDoc4 = await Arms.findOne({}).skip(skip4).exec();

    day4.push(randomDoc4.name);

    const totalAbs4= await Abs.countDocuments();
    const skipAbs4 = Math.floor(Math.random() * totalAbs4) ;
    const randomDocAbs4 = await Abs.findOne({}).skip(skipAbs4).exec();

    day4.push(randomDocAbs4.name);

    const totalLeg4 = await Legs.countDocuments();
    const skipLegs4 = Math.floor(Math.random() * totalLeg4) ;
    const randomDocLegs4 = await Legs.findOne({}).skip(skipLegs4).exec();

    day4.push(randomDocLegs4.name);

    const totalChest4 = await Chest.countDocuments();
    const skipChest4 = Math.floor(Math.random() * totalChest4) ;
    const randomDocChest4 = await Chest.findOne({}).skip(skipChest4).exec();

    day4.push(randomDocChest4.name);

    const totalBack4 = await Back.countDocuments();
    const skipBack4 = Math.floor(Math.random() * totalBack4) ;
    const randomDocBack4 = await Back.findOne({}).skip(skipBack4).exec();

    day4.push(randomDocBack4.name)

    res.render('page/download',{fDay:day1,sDay:day2,tDay:day3,fourDay:day4,fifDay:day5,sixDay:day6,programType:programType});

    }else if (req.user.days === 5){

    
      /////////////////////// DAY5

      
            // day 1 of 2
    const total = await Arms.countDocuments();
    const skip = Math.floor(Math.random() * total) ;
    const randomDoc = await Arms.findOne({}).skip(skip).exec();

    day1.push(randomDoc.name);

    const totalAbs = await Abs.countDocuments();
    const skipAbs = Math.floor(Math.random() * totalAbs) ;
    const randomDocAbs = await Abs.findOne({}).skip(skipAbs).exec();

    day1.push(randomDocAbs.name);

    const totalLegs = await Legs.countDocuments();
    const skipLegs = Math.floor(Math.random() * totalLegs) ;
    const randomDocLegs = await Legs.findOne({}).skip(skipLegs).exec();

    day1.push(randomDocLegs.name);

    const totalChest = await Chest.countDocuments();
    const skipChest = Math.floor(Math.random() * totalChest) ;
    const randomDocChest = await Chest.findOne({}).skip(skipChest).exec();

    day1.push(randomDocChest.name);

    const totalBack = await Back.countDocuments();
    const skipBack = Math.floor(Math.random() * totalBack) ;
    const randomDocBack = await Back.findOne({}).skip(skipBack).exec();

    day1.push(randomDocBack.name);

    //// day 2 of 2
    
    const total2 = await Arms.countDocuments();
    const skip2 = Math.floor(Math.random() * total2) ;
    const randomDoc2 = await Arms.findOne({}).skip(skip2).exec();

    day2.push(randomDoc2.name);

    const totalAbs2 = await Abs.countDocuments();
    const skipAbs2 = Math.floor(Math.random() * totalAbs2) ;
    const randomDocAbs2 = await Abs.findOne({}).skip(skipAbs2).exec();

    day2.push(randomDocAbs2.name);

    const totalLeg2 = await Legs.countDocuments();
    const skipLegs2 = Math.floor(Math.random() * totalLeg2) ;
    const randomDocLegs2 = await Legs.findOne({}).skip(skipLegs2).exec();

    day2.push(randomDocLegs2.name);

    const totalChest2 = await Chest.countDocuments();
    const skipChest2 = Math.floor(Math.random() * totalChest2) ;
    const randomDocChest2 = await Chest.findOne({}).skip(skipChest2).exec();

    day2.push(randomDocChest2.name);

    const totalBack2 = await Back.countDocuments();
    const skipBack2 = Math.floor(Math.random() * totalBack2) ;
    const randomDocBack2 = await Back.findOne({}).skip(skipBack2).exec();

    day2.push(randomDocBack2.name);




    // day 3 of 3

      const total3 = await Arms.countDocuments();
      const skip3 = Math.floor(Math.random() * total3) ;
      const randomDoc3 = await Arms.findOne({}).skip(skip3).exec();
  
      day3.push(randomDoc3.name);
  
      const totalAbs3 = await Abs.countDocuments();
      const skipAbs3 = Math.floor(Math.random() * totalAbs3) ;
      const randomDocAbs3 = await Abs.findOne({}).skip(skipAbs3).exec();
  
      day3.push(randomDocAbs3.name);
  
      const totalLeg3 = await Legs.countDocuments();
      const skipLegs3 = Math.floor(Math.random() * totalLeg3) ;
      const randomDocLegs3 = await Legs.findOne({}).skip(skipLegs3).exec();
  
      day3.push(randomDocLegs3.name);
  
      const totalChest3 = await Chest.countDocuments();
      const skipChest3 = Math.floor(Math.random() * totalChest3) ;
      const randomDocChest3 = await Chest.findOne({}).skip(skipChest3).exec();
  
      day3.push(randomDocChest3.name);
  
      const totalBack3 = await Back.countDocuments();
      const skipBack3 = Math.floor(Math.random() * totalBack3) ;
      const randomDocBack3 = await Back.findOne({}).skip(skipBack3).exec();
  
      day3.push(randomDocBack3.name);


        // day 4 of 4
    
    const total4 = await Arms.countDocuments();
    const skip4 = Math.floor(Math.random() * total4) ;
    const randomDoc4 = await Arms.findOne({}).skip(skip4).exec();

    day4.push(randomDoc4.name);

    const totalAbs4= await Abs.countDocuments();
    const skipAbs4 = Math.floor(Math.random() * totalAbs4) ;
    const randomDocAbs4 = await Abs.findOne({}).skip(skipAbs4).exec();

    day4.push(randomDocAbs4.name);

    const totalLeg4 = await Legs.countDocuments();
    const skipLegs4 = Math.floor(Math.random() * totalLeg4) ;
    const randomDocLegs4 = await Legs.findOne({}).skip(skipLegs4).exec();

    day4.push(randomDocLegs4.name);

    const totalChest4 = await Chest.countDocuments();
    const skipChest4 = Math.floor(Math.random() * totalChest4) ;
    const randomDocChest4 = await Chest.findOne({}).skip(skipChest4).exec();

    day4.push(randomDocChest4.name);

    const totalBack4 = await Back.countDocuments();
    const skipBack4 = Math.floor(Math.random() * totalBack4) ;
    const randomDocBack4 = await Back.findOne({}).skip(skipBack4).exec();

    day4.push(randomDocBack4.name)

    // day 5 of 5

      const total5 = await Arms.countDocuments();
      const skip5 = Math.floor(Math.random() * total5) ;
      const randomDoc5 = await Arms.findOne({}).skip(skip5).exec();
  
      day5.push(randomDoc5.name);
  
      const totalAbs5 = await Abs.countDocuments();
      const skipAbs5 = Math.floor(Math.random() * totalAbs5) ;
      const randomDocAbs5 = await Abs.findOne({}).skip(skipAbs5).exec();
  
      day5.push(randomDocAbs5.name);
  
      const totalLeg5 = await Legs.countDocuments();
      const skipLegs5 = Math.floor(Math.random() * totalLeg5) ;
      const randomDocLegs5 = await Legs.findOne({}).skip(skipLegs5).exec();
  
      day5.push(randomDocLegs5.name);
  
      const totalChest5 = await Chest.countDocuments();
      const skipChest5 = Math.floor(Math.random() * totalChest5) ;
      const randomDocChest5 = await Chest.findOne({}).skip(skipChest5).exec();
  
      day5.push(randomDocChest5.name);
  
      const totalBack5 = await Back.countDocuments();
      const skipBack5 = Math.floor(Math.random() * totalBack5) ;
      const randomDocBack5 = await Back.findOne({}).skip(skipBack5).exec();
  
      day5.push(randomDocBack5.name);

      res.render('page/download',{fDay:day1,sDay:day2,tDay:day3,fourDay:day4,fifDay:day5,sixDay:day6,programType:programType});

    }else if (req.user.days === 6){

      
        /////////////////////// DAY6

           // day 1 of 6
    const total = await Arms.countDocuments();
    const skip = Math.floor(Math.random() * total) ;
    const randomDoc = await Arms.findOne({}).skip(skip).exec();

    day1.push(randomDoc.name);

    const totalAbs = await Abs.countDocuments();
    const skipAbs = Math.floor(Math.random() * totalAbs) ;
    const randomDocAbs = await Abs.findOne({}).skip(skipAbs).exec();

    day1.push(randomDocAbs.name);

    const totalLegs = await Legs.countDocuments();
    const skipLegs = Math.floor(Math.random() * totalLegs) ;
    const randomDocLegs = await Legs.findOne({}).skip(skipLegs).exec();

    day1.push(randomDocLegs.name);

    const totalChest = await Chest.countDocuments();
    const skipChest = Math.floor(Math.random() * totalChest) ;
    const randomDocChest = await Chest.findOne({}).skip(skipChest).exec();

    day1.push(randomDocChest.name);

    const totalBack = await Back.countDocuments();
    const skipBack = Math.floor(Math.random() * totalBack) ;
    const randomDocBack = await Back.findOne({}).skip(skipBack).exec();

    day1.push(randomDocBack.name);

    //// day 2 of 6
    
    const total2 = await Arms.countDocuments();
    const skip2 = Math.floor(Math.random() * total2) ;
    const randomDoc2 = await Arms.findOne({}).skip(skip2).exec();

    day2.push(randomDoc2.name);

    const totalAbs2 = await Abs.countDocuments();
    const skipAbs2 = Math.floor(Math.random() * totalAbs2) ;
    const randomDocAbs2 = await Abs.findOne({}).skip(skipAbs2).exec();

    day2.push(randomDocAbs2.name);

    const totalLeg2 = await Legs.countDocuments();
    const skipLegs2 = Math.floor(Math.random() * totalLeg2) ;
    const randomDocLegs2 = await Legs.findOne({}).skip(skipLegs2).exec();

    day2.push(randomDocLegs2.name);

    const totalChest2 = await Chest.countDocuments();
    const skipChest2 = Math.floor(Math.random() * totalChest2) ;
    const randomDocChest2 = await Chest.findOne({}).skip(skipChest2).exec();

    day2.push(randomDocChest2.name);

    const totalBack2 = await Back.countDocuments();
    const skipBack2 = Math.floor(Math.random() * totalBack2) ;
    const randomDocBack2 = await Back.findOne({}).skip(skipBack2).exec();

    day2.push(randomDocBack2.name);




    // day 3 of 6

      const total3 = await Arms.countDocuments();
      const skip3 = Math.floor(Math.random() * total3) ;
      const randomDoc3 = await Arms.findOne({}).skip(skip3).exec();
  
      day3.push(randomDoc3.name);
  
      const totalAbs3 = await Abs.countDocuments();
      const skipAbs3 = Math.floor(Math.random() * totalAbs3) ;
      const randomDocAbs3 = await Abs.findOne({}).skip(skipAbs3).exec();
  
      day3.push(randomDocAbs3.name);
  
      const totalLeg3 = await Legs.countDocuments();
      const skipLegs3 = Math.floor(Math.random() * totalLeg3) ;
      const randomDocLegs3 = await Legs.findOne({}).skip(skipLegs3).exec();
  
      day3.push(randomDocLegs3.name);
  
      const totalChest3 = await Chest.countDocuments();
      const skipChest3 = Math.floor(Math.random() * totalChest3) ;
      const randomDocChest3 = await Chest.findOne({}).skip(skipChest3).exec();
  
      day3.push(randomDocChest3.name);
  
      const totalBack3 = await Back.countDocuments();
      const skipBack3 = Math.floor(Math.random() * totalBack3) ;
      const randomDocBack3 = await Back.findOne({}).skip(skipBack3).exec();
  
      day3.push(randomDocBack3.name);


        // day 4 of 6
    
    const total4 = await Arms.countDocuments();
    const skip4 = Math.floor(Math.random() * total4) ;
    const randomDoc4 = await Arms.findOne({}).skip(skip4).exec();

    day4.push(randomDoc4.name);

    const totalAbs4= await Abs.countDocuments();
    const skipAbs4 = Math.floor(Math.random() * totalAbs4) ;
    const randomDocAbs4 = await Abs.findOne({}).skip(skipAbs4).exec();

    day4.push(randomDocAbs4.name);

    const totalLeg4 = await Legs.countDocuments();
    const skipLegs4 = Math.floor(Math.random() * totalLeg4) ;
    const randomDocLegs4 = await Legs.findOne({}).skip(skipLegs4).exec();

    day4.push(randomDocLegs4.name);

    const totalChest4 = await Chest.countDocuments();
    const skipChest4 = Math.floor(Math.random() * totalChest4) ;
    const randomDocChest4 = await Chest.findOne({}).skip(skipChest4).exec();

    day4.push(randomDocChest4.name);

    const totalBack4 = await Back.countDocuments();
    const skipBack4 = Math.floor(Math.random() * totalBack4) ;
    const randomDocBack4 = await Back.findOne({}).skip(skipBack4).exec();

    day4.push(randomDocBack4.name)

    // day 5 of 6

      const total5 = await Arms.countDocuments();
      const skip5 = Math.floor(Math.random() * total5) ;
      const randomDoc5 = await Arms.findOne({}).skip(skip5).exec();
  
      day5.push(randomDoc5.name);
  
      const totalAbs5 = await Abs.countDocuments();
      const skipAbs5 = Math.floor(Math.random() * totalAbs5) ;
      const randomDocAbs5 = await Abs.findOne({}).skip(skipAbs5).exec();
  
      day5.push(randomDocAbs5.name);
  
      const totalLeg5 = await Legs.countDocuments();
      const skipLegs5 = Math.floor(Math.random() * totalLeg5) ;
      const randomDocLegs5 = await Legs.findOne({}).skip(skipLegs5).exec();
  
      day5.push(randomDocLegs5.name);
  
      const totalChest5 = await Chest.countDocuments();
      const skipChest5 = Math.floor(Math.random() * totalChest5) ;
      const randomDocChest5 = await Chest.findOne({}).skip(skipChest5).exec();
  
      day5.push(randomDocChest5.name);
  
      const totalBack5 = await Back.countDocuments();
      const skipBack5 = Math.floor(Math.random() * totalBack5) ;
      const randomDocBack5 = await Back.findOne({}).skip(skipBack5).exec();
  
      day5.push(randomDocBack5.name);   

    // day 6 of 6
    
    const total6 = await Arms.countDocuments();
    const skip6 = Math.floor(Math.random() * total6) ;
    const randomDoc6 = await Arms.findOne({}).skip(skip6).exec();

    day6.push(randomDoc6.name);

    const totalAbs6 = await Abs.countDocuments();
    const skipAbs6 = Math.floor(Math.random() * totalAbs6) ;
    const randomDocAbs6 = await Abs.findOne({}).skip(skipAbs6).exec();

    day6.push(randomDocAbs6.name);

    const totalLeg6 = await Legs.countDocuments();
    const skipLegs6 = Math.floor(Math.random() * totalLeg6) ;
    const randomDocLegs6 = await Legs.findOne({}).skip(skipLegs6).exec();

    day6.push(randomDocLegs6.name);

    const totalChest6 = await Chest.countDocuments();
    const skipChest6 = Math.floor(Math.random() * totalChest6) ;
    const randomDocChest6 = await Chest.findOne({}).skip(skipChest6).exec();

    day6.push(randomDocChest6.name);

    const totalBack6 = await Back.countDocuments();
    const skipBack6 = Math.floor(Math.random() * totalBack6) ;
    const randomDocBack6 = await Back.findOne({}).skip(skipBack6).exec();

    day6.push(randomDocBack6.name);
    

    res.render('page/download',{fDay:day1,sDay:day2,tDay:day3,fourDay:day4,fifDay:day5,sixDay:day6,programType:programType});
    }

}));

router.get('/blog',catchAsync(async(req,res)=>{

    const blogs = await Blog.find({})
   console.log(blogs);
    res.render('page/blog',{blogs});

}));



router.get('/blog/:blogId',catchAsync(async(req,res)=>{

    const blogId = req.params.blogId;
    const blog = await Blog.findOne({_id:blogId})
   
    res.render('page/post',{title:blog.title  ,  text:blog.text,  image:blog.image})
}));


router.post('/email',(req,res)=>{


    const{ email,subject,text} = req.body;

    console.log("data :",req.body)


    sendMail(email,subject,text, function(err,data) {
            if(err){
                res.status(500).json({message:'Internal Error'});
            }else{
                res.json({message:'Email send' });
            }

    });

});



module.exports = router;
