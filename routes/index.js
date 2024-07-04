var express = require('express');
var router = express.Router();


const user_model = require("../models/userSchema")
const post_model = require("../models/post_Schema")
const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(new LocalStrategy(user_model.authenticate()));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/register",(req,res,next)=>{
  res.render("register")
});

router.post("/register",async (req,res,next)=>{
  try{
    const{name,username,email,password} = req.body
    await user_model.register({name,username,email},password)
    res.redirect("/login")
  }catch(error){
    res.send(error)
  }
  
});

router.get("/login",(req,res,next)=>{
  res.render("login")
});

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login"
}))

function isLoggedIn (req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}


router.get("/profile",isLoggedIn,(req,res,next)=>{
  res.render("profile",{user:req.user})
});

router.get("/post",isLoggedIn,(req,res,next)=>{
  res.render("post")
});

router.post("/post",isLoggedIn,async (req,res,next)=>{
  const loggedUser = await user_model.findOne({username:req.session.passport.user})
  // console.log(loggedUser);
  const post = await post_model.create({
    title:req.body.title,
    caption:req.body.caption
  })
  post.user = loggedUser._id
  loggedUser.posts.push(post._id)
  await  post.save()
  await  loggedUser.save()
  res.json(post)
})
router.get("/feed",isLoggedIn,async (req,res,next)=>{
   const posts = await post_model.find().populate("user")
  //  res.send(posts)
  res.render("feed",{posts})
});
module.exports = router;
