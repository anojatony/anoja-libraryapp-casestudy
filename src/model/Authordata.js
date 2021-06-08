
// Accessing monngose package
const mongoose = require('mongoose');

// Database connection (connecting server with database using mongoose package)
// mongoose.connect('mongodb://localhost:27017/libraryapp', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect('mongodb+srv://userone:userone@ictak-files.utn4t.mongodb.net/libraryapp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });


// Schema definition
const Schema=mongoose.Schema;

const AuthorSchema=new Schema({
    author:String,
    content:String,
    image:String
});

// Model Creation
var Authordata=mongoose.model('authordata',AuthorSchema);

module.exports = Authordata;