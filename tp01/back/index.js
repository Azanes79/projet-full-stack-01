require('dotenv').config()
var cors = require('cors');
const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var likesRouter = require('./routes/likes');
const decodeIDToken = require('./authenticateToken');

var app = express();

// socket io
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    credentials: true
  }
});

app.use(cors());
app.use(logger('dev'));
app.use(decodeIDToken);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(
  'mongodb+srv://admin:admin@cluster-fullstack-01.9uy6t.mongodb.net/instaclone?retryWrites=true&w=majority',
  {
      useNewUrlParser: true, useUnifiedTopology: true 
  }
).then(() => {
  console.log('Connected to database');
}).catch((err) => console.log('Error connecting database', err.message));

// routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/likes', likesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(erAr, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

io.on('connection', (socket) => {
  console.log('Demande de connection');

  socket.on('like', (post) => io.emit('like', post));
  socket.on('unlike', (post) => io.emit('unlike', post));
  socket.on('post', (post) => io.emit('post', post));
  socket.on('post-delete', (post) => io.emit('post-delete', post));
});

http.listen(process.env.IO_PORT, () => {
  console.log(`Server [socket-io] is running on port ${process.env.IO_PORT}`)
});

app.listen(process.env.PORT, () => {
    console.log(`Server [node-js] is running on port ${process.env.PORT}`);
});

module.exports = app;
