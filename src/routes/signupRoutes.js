
  const express=require('express');
  const signupRouter=express.Router();
  
  
  const User=require('../model/Userdata');
  const bcrypt = require('bcrypt');


   function signup(nav){
  
    
    signupRouter.get('/',function(req,res){
        res.render("signup",
        {
            nav,
            title:'Library'
        });
    })
     
    signupRouter.post('/add',function (req,res){
       
        // extracting values from the form body
        const {firstname, lastname, email, password, phone, address} = req.body;
        console.log(' First Name ' + firstname+' Last Name ' + lastname+ ' email :' + email+ ' password:' + password+ ' phone:' + phone+ ' address:' + address);
        let errors = [];

        // checking whether user exists in the database via email , otherwise proceed with registration  
       
        User.findOne({email : email}).exec(function(err,user){
        console.log(user);
        if(user) {
        errors.push({msg: 'This Email is already in use. Please login to continue'});
        res.render("signup",{
            nav,
            title:'Library',
            errors
        })       
        } 
        else {
            const newUser = new User({              // else new user created,  new user detals save to a variable newUser
                firstname : firstname,
                lastname:lastname,
                email : email,
                password : password,
                phone:phone,
                address:address
            });

            // hashing password using bcrypt to store password in the database 
            // bcrypt used to store password in a more secured way

            bcrypt.genSalt(10,(err,salt)=>          // generating a salt
            bcrypt.hash(newUser.password,salt,       // hash users password
                function(err,hash) {
                    if(err) throw err;               // if error throw error
                
                 //else save password to hash
                 newUser.password = hash;
                //save user to database 
                    newUser.save()
                // if user saved then console the details of the saved user
                    .then(function(value){
                        console.log(value)

                 //connect-flash for displaying success_msg 
                    req.flash('success_msg','Registered successfully! Please login to continue')  
                    res.redirect('/login');  //on successful registration redirects to login
                    })
                    .catch(value=> console.log(value));
                }));
        }        //else statement ends here
    })            //
   
       })        

    return signupRouter;
}

   module.exports=signup;