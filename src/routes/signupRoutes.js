
  const express=require('express');
  const signupRouter=express.Router();
  
  const User=require('../model/Userdata');
 


   function signup(nav){
  
    // signup
    signupRouter.get('/',function(req,res){
        res.render("signup",
        {
            nav,
            title:'Library'
        });
    })
     


        // signup post route
    signupRouter.post('/add',function (req,res){
       
        // consoling values from the form body
        const {firstname, lastname, email, password, phone, address} = req.body;
        console.log(' First Name ' + firstname+' Last Name ' + lastname+ ' email :' + email+ ' password:' + password+ ' phone:' + phone+ ' address:' + address);

        // checking whether user exists in the database via email , otherwise proceed with registration  
       
        User.findOne({email : email}).exec(function(err,user){
        console.log(user);
        if(user) {
        req.flash('error_msg','This Email is already in use. Please login to continue.') 
        res.redirect('/signup');     
        } 

        else {
            const newUser = new User({              // else new user created,  new user details saved to a variable newUser
                firstname : firstname,
                lastname:lastname,
                email : email,
                password : password,
                phone:phone,
                address:address
            });

                //save user to database 
                    newUser.save()

                // if user saved then console the details of the saved user
                    .then(function(value){
                        console.log(value)

                 //connect-flash for displaying success_msg 
                    req.flash('success_msg','Registered successfully! Please login to continue')  
                    res.redirect('/login');  //on successful registration redirects to login
                    })
                      
               
        }        //else statement ends here
    })            
   
       })        

    return signupRouter;
}

   module.exports=signup;