
//library app // Main Server

const express=require('express');
const app = new express();
const flash = require('connect-flash');
const session = require('express-session');
const passport=require('passport');


//PORT
const port=process.env.PORT || 8000;

//navbar defining globally
const nav=[
    {
        link:'/admin/books',
        name:'Books'
    },
    {
        link:'/admin/authors',
        name:'Authors'
    },
    {
        link:'/admin/addbook',
        name:'Add Book'
    },
    {
        link:'/admin/addauthor',
        name:'Add Author'
    },
    {
        link:'/logout',
        name:'LOG OUT'
    }
];

navuser=[

    {
        link:'/user/books',
        name:'BOOKS'
    },
    {
        link:'/user/authors',
        name:'AUTHORS'
    },
    {
        link:'/logout',
        name:'LOG OUT'
    }


]

const signupRouter=require('./src/routes/signupRoutes')(nav);
const loginRouter=require('./src/routes/loginRoutes')(nav);
const userRouter=require('./src/routes/userRoutes')(navuser);
const adminRouter=require('./src/routes/adminRoutes')(nav);


// POST middleware
app.use(express.urlencoded({extended:true}));

//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
   }));


//use flash
   app.use(flash());
   app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
     next();
   })

//middleware function..static
app.use(express.static('./public'));


// setting ejs    
app.set('view engine','ejs');  
app.set('views','./src/views');



app.use('/signup',signupRouter);
app.use('/login',loginRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);



// route
app.get('/',function(req,res){
    res.render("index",
    {
        title:'Library'
    });
})

//logout 
app.get('/logout',function(req,res){
    req.flash('success_msg','You are logged out');    //succ_msg (flash message)
    res.redirect('/login');                           //redirecting to login
})

app.listen(port,()=>{
    console.log("Server Ready at"+port);
});