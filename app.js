var createError = require('http-errors');
var express = require('express');
const env = require("dotenv").config();
const session = require ("express-session");
const methodOverride = require('method-override');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const db = require ("./config/db")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

db()    

app.use(methodOverride('_method'));
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:process.env.SECRET_KEY, 
    resave:false,  
    saveUninitialized:true, 
    cookie:{
        secure:false,
        httpOnly:true,
        maxAge:72*60*60*1000
    }
})) 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(process.env.PORT,()=>{
    console.log("Server is running http://localhost:"+process.env.PORT)
})

module.exports = app;
