const express=require('express');
const userRouter=express.Router();
const Bookdata=require('../model/Bookdata');
const Authordata=require('../model/Authordata');


    
function router(navuser){
   
    //user 
    userRouter.get('/',function(req,res){
        Bookdata.find()
        .then(function(books){
            res.render("userwelcome",
            {
                navuser,
                title:'Library',
            });      
        })
    })

    //user  books
    userRouter.get('/books',function(req,res){
        Bookdata.find()
        .then(function(books){
            res.render("userbooks",
            {
                navuser,
                title:'Library',
                books
            });      
        })
    })
    
    //user single book
    userRouter.get('/books/:id',function(req,res){
        const id=req.params.id
        Bookdata.findOne({_id:id})
        .then(function(book){
            res.render('userbook',{
                navuser,
                title:'Library',
                book
            });
        })
    });

    // .........................................................................BOOKS ENDS




    //  .......................................................................AUTHORS STARTS



    // user authors
    
    userRouter.get('/authors',function(req,res){
        Authordata.find()
        .then(function(authors){
            res.render("userauthors",
            {
                navuser,
                title:'Library',
                authors
            });      
        })
    })
    
      //user single author
      userRouter.get('/authors/:id',function(req,res){
        const id=req.params.id
        Authordata.findOne({_id:id})
        .then(function(author){
            res.render('userauthor',{
                navuser,
                title:'Library',
                author
            });
        })
    });


    return userRouter;
    
}


// module.exports=booksRouter;
module.exports=router;

