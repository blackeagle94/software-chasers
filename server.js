var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const upload = require('express-fileupload')

// Import Routes
var indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts.routes')
const usersRouter = require('./routes/users.routes')
const moviesRouter = require('./routes/movies.routes')
const sunbscribesRouter = require('./routes/subscribes.routes')

//middlewares
const verifyToken = require('./auth/verifyToken')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//DB connection
require('./config/db.config')()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload())
app.use(cors())

//Routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', moviesRouter);
app.use('/', sunbscribesRouter)
// app.use('/', verifyToken, postsRouter) // with auth
app.use('/', postsRouter)


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

module.exports = app;
