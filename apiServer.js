var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', index);
// app.use('/users', users);

//APIs
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/bookshop');
mongoose.connect('mongodb://testUser:test@ds121726.mlab.com:21726/bookshop');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));

//Sessions
app.use(session({
  secret: 'mySecretString',
  saveUninitialized:false,
  resave:false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}, // 2 days in milliseconds
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
  //ttl: 2 days * 24 hours * 60 minutes * 60 seconds
}))
// Save to Session
app.post('/cart', (req, res) => {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save((err) => {
    if(err){
      throw err;
    }
    res.json(req.session.cart);
  })
})

app.get('/cart', (req,res) => {
  if(typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
});

var Books = require('./models/books.js');

//POST books
app.post('/books', (req, res) => {
  var book = req.body;

  Books.create(book, (err, books) => {
    if(err){
      throw err;
    }
    res.json(books);
  })
});

//GET Books
app.get('/books', (req, res) => {
  Books.find((err, books) => {
    if(err){
      throw err;
    }
    res.json(books);
  })
});

//DELETE Books
app.delete('/books/:_id', (req, res) => {
  var query = {_id: req.params._id};

  Books.remove(query, (err, books) => {
    if(err){
      console.log("~ API DELETE BOOKS: ", err);
    }
    res.json(books);
  })
});

//UPDATE/PUT Books
app.put('/books/:_id', (req, res) => {
  var book = req.body;
  var query = {_id: req.params._id};
  //if the field doesn't exist $set will set a new field
  var update ={
    '$set':{
      title:book.title,
      description:book.description,
      image:book.image,
      price:book.price
    }
  };
  //when true returns the updated document
  var options = {new: true};

  Books.findOneAndUpdate(query, update, options, (err, books) => {
    if(err){
      throw err;
    }
    res.json(books);
  })
});

//GET Images
app.get('/images', (req, res) => {
  const imgFolder = __dirname + '/public/images';
  const fs = require('fs');
  //read all files in directory
  fs.readdir(imgFolder, (err, files) =>{
    if(err){
      return console.error(err);
    }
    const filesArr = [];
    files.forEach(file => {
      filesArr.push({name: file});
    });
    res.json(filesArr);
  })
});

//END APIs

app.listen(3001, (err) => {
  if(err){
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001')
})
