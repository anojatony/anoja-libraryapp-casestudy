
const express=require('express');
const loginRouter=express.Router();

const User=require('../model/Userdata');
 


   function login(nav){
  

    // login
    loginRouter.get('/',function(req,res){
        res.render("login",
        {
            nav,
            title:'Library'
        });
    })



    // login post route
    loginRouter.post('/add',function(req, res) {
    
    
        var email= req.body.email;
        var password= req.body.password;

      
      //admin credentials email & password
      if((req.body.email== "admin@gmail.com") && (req.body.password == "Admin123@")){

       res.redirect('/admin')
      }

      
      else{

        User.findOne({email:email, password:password},function(err,user){

          if(err){
            console.log(err)
          }
          if(!user){ 
           req.flash('error_msg','Invalid login! Please try again.') 
           return  res.redirect('/login')
          }
           return res.redirect('/user')
        })
      }
    })
   
     
  return loginRouter;
}

module.exports=login;