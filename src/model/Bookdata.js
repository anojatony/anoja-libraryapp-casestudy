
// Accessing monngose package
const mongoose = require('mongoose');

// Database connection (connecting server with database using mongoose package)
mongoose.connect('mongodb://localhost:27017/libraryapp', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect('mongodb+srv://userone:userone@ictak-files.utn4t.mongodb.net/LIBRARY?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema definition
const Schema=mongoose.Schema;

const BookSchema=new Schema({
    title:String,
    author:String,
    genre:String,
    content:String,
    image:String
});

// Model Creation
var Bookdata=mongoose.model('bookdata',BookSchema);

module.exports = Bookdata;