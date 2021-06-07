
const express=require('express');
const { serializeUser } = require('passport');
const loginRouter=express.Router();

// passport
const passport=require('passport');
const LocalStrategy = require('passport-local').Strategy;   // passport localstrategy

const bcrypt = require('bcrypt');      // for decrypting password

const User=require('../model/Userdata');
 


// Configuring passport by setting up localstrategy for authentication

  passport.use(
    new LocalStrategy({usernameField : 'email'},(email,password,done)=> {
            
           //to check if the entered email id is there in the database
            User.findOne({email : email})

            // got an email id ? then passing 
            .then(function(user){

            // if it is not a registered user,  then asking to register 
             if(!user) {
                 return done(null,false);
             }

            //  else
             //checking if password matches or not... with bcrypt
             bcrypt.compare(password,user.password,(err,isMatch)=>{
                 if(err) throw err;                 //compared and if error is there in comparing then throw error 

                 if(isMatch) {                      //compared and if it is a match then end  callback function 
                     return done(null,user);
                 } else {                            //otherwise give a message saying incorrect password
                     return done(null,false,{message : 'Incorrect Password'});   
                 }
             })     //bcrypt ends 
            })       //then
            
            
    })              //localstrategy
    
)


 //To support login sessions use serialzeUser and deserializeUser (passport)
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

 //Passport configuration ends and now authenticate in login post route


   function login(nav){
  
    
    loginRouter.get('/',function(req,res){
        res.render("login",
        {
            nav,
            title:'Library'
        });
    })

    loginRouter.post('/add',function(req, res,next) {
    
      //admin credentials email & password
      if((req.body.email== "admin@gmail.com") && (req.body.password == "Admin123@")){

       res.redirect('/admin')
      }

      
      else{

     //Passport authentication implementation
      passport.authenticate('local',{
        successRedirect : '/user',      //if successfully logged in,  then redirect to user welcome page
        failureRedirect : '/login',     //if not successfully logged in,  then redirect to the same login page
        failureFlash : true,            //for getting flash error messages
        })(req,res,next);

      }
    })
   
     
  return loginRouter;
}

module.exports=login;