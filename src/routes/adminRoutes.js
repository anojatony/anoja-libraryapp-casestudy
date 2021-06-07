const express=require('express');
const adminRouter=express.Router();
const multer = require('multer');
const Bookdata=require('../model/Bookdata');
const Authordata=require('../model/Authordata');



// multer setup

// setting up storage folder destination and filename
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, './public/images');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname + Date.now()+ '--');
    }
  });
  
// specifying file type
  const fileFilter = (req,file,callback)=>{
   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
   callback(null,true);
   }
   else{
       callback(null,false);
   }
  }
  
  
  const upload = multer({
      storage: storage,
      fileFilter:fileFilter
    });
  

// multer ends



    
function router(nav){
   
    // admin 
    adminRouter.get('/',function(req,res){
        Bookdata.find()
        .then(function(books){
            res.render("adminwelcome",
            {
                nav,
                title:'Library'
            });      
        })
    })

    //admin books
    adminRouter.get('/books',function(req,res){
        Bookdata.find()
        .then(function(books){
            res.render("adminbooks",
            {
                nav,
                title:'Library',
                books
            });      
        })
    })
    
    //admin single book
    adminRouter.get('/books/:id',function(req,res){
        const id=req.params.id
        Bookdata.findOne({_id:id})
        .then(function(book){
            res.render('adminbook',{
                nav,
                title:'Library',
                book
            });
        })
    });

//    admin book update

    adminRouter.get('/books/update/:id',function(req,res){
        const id=req.params.id
        Bookdata.findOne({_id:id})
        .then(function(book){
            res.render('updatebooks',{
                nav,
                title:'Library',
                book
            });
        })
    });

    
    //admin book updating and submitting details

    adminRouter.post('/books/update/add/:id',upload.single('image'),function (req,res){
        const id=req.params.id

      Bookdata.updateOne({_id:id}, {
              title:req.body.title,
              author:req.body.author,
              genre:req.body.genre,
              content:req.body.content,
              image:req.file.filename
    }, function(err, result){
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
            res.redirect('/admin/books');
        }
    }
    
    )
       })
  

 
    // admin book delete 
    adminRouter.get('/books/delete/:id',function(req,res){
        const id=req.params.id
        Bookdata.deleteOne({_id:id},function(err, result){
            if(err){
                console.log(err)
            }
            else{
                console.log(result)
                res.redirect('/admin/books');
            }
        })
    });



    // admin adding book

adminRouter.get('/addbook',function(req,res){
    res.render("addbook",
    {
        nav,
        title:'Library',
    });
})




// admin submitting book details

adminRouter.post('/addbook/add',upload.single('image'),function (req,res){
    console.log(req.file);
 var item={
   title:req.body.title,
   author:req.body.author,
   genre:req.body.genre,
   content:req.body.content,
   image: req.file.filename
}
var book = Bookdata(item);
book.save();
res.redirect('/admin/books');
})

    //  ......................................................................BOOKS ENDS



    // ......................................................................AUTHORS STARTS


    // adim authors
    
    adminRouter.get('/authors',function(req,res){
        Authordata.find()
        .then(function(authors){
            res.render("adminauthors",
            {
                nav,
                title:'Library',
                authors
            });      
        })
    })
    
      //admin single author
      adminRouter.get('/authors/:id',function(req,res){
        const id=req.params.id
        Authordata.findOne({_id:id})
        .then(function(author){
            res.render('adminauthor',{
                nav,
                title:'Library',
                author
            });
        })
    });


    // admin update author

    adminRouter.get('/authors/update/:id',function(req,res){
        const id=req.params.id
        Authordata.findOne({_id:id})
        .then(function(author){
            res.render('updateauthors',{
                nav,
                title:'Library',
                author
            });
        })
    });

    //admin  updating details and submitting

    adminRouter.post('/authors/update/add/:id',upload.single('image'),function (req,res){
        const id=req.params.id

        Authordata.updateOne({_id:id}, {
              author:req.body.author,
              genre:req.body.genre,
              content:req.body.content,
              image:req.file.filename
    }, function(err, result){
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
            res.redirect('/admin/authors');
        }
    }
    
    )
       })
  

// admin delete author
    adminRouter.get('/authors/delete/:id',function(req,res){
        const id=req.params.id
        Authordata.deleteOne({_id:id},function(err, result){
            if(err){
                console.log(err)
            }
            else{
                console.log(result)
                res.redirect('/admin/authors');
            }
        })
    });


// admin add author

adminRouter.get('/addauthor',function(req,res){
    res.render("addauthor",
    {
        nav,
        title:'Library',
    });
})


// admin submitting author details

 adminRouter.post('/addauthor/add',upload.single('image'),function (req,res){
  var item={
    author:req.body.author,
    content:req.body.content,
    image: req.file.filename
}

var author = Authordata(item);
author.save();
res.redirect('/admin/authors');
 })

 return adminRouter;
    
}



module.exports=router;

