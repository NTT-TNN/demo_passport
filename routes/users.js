
var express = require('express');
var passport=require('passport');

var router = express.Router();
// login=false;
/* GET users listing. */
router.get('/',isLoggedIn, function(req, res, next) {
  res.render('home',{message:req.flash('loginMessage')});
});

router.get('/login',function(req,res,next){
  res.render('login.ejs',{message:req.flash('loginMessage')});
});

router.get('/signup',function(req,res){
  res.render('signup.ejs',{message:req.flash('loginMessage')});
});

router.get('/profile',isLoggedIn,function(req,res){
  res.render('profile.ejs',{user:req.user});
});

router.get('/logout',isLoggedIn,function(req,res){
  req.logout();
  login=false;
  res.redirect('/users');
})

router.post('/signup',passport.authenticate('local-signup',{
  successRedirect:'/',
  failureRedirect:'/users/signup',
  failureFlash:true,
}));

router.post('/login',passport.authenticate('local-login',{
  successRedirect: '/users',
  failureRedirect: '/users/login',
  failureFlash: true,
}))

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/users/profile',
  failureRedirect: '/home',
}));

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/users',
  failureRedirect: '/users/login',
}));


module.exports = router;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    login=true;
    return next();
  }
  res.redirect('/');
}
