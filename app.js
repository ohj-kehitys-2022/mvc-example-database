var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/book');
var borrowersRouter = require('./routes/borrower');
var loginRouter = require('./routes/login');
var borrowRouter = require('./routes/borrow');
var borrowdetailRouter = require('./routes/borrowdetail');

var app = express();

//app.use(cors());
app.use(
  cors({
    origin: [
      'http://localhost',
      'http://localhost:80',
    ],
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    credentials: true,
    maxAge: 600,
    exposedHeaders: ['*', 'Authorization', ]
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//SUOJAAMATTOMAT ENDPOINTIT
app.use('/', indexRouter);
app.use('/login', loginRouter);

//app.use(authenticateToken);
app.use(verifyToken);
//SUOJATUT ENDPOINTIT
app.use('/book', booksRouter);
app.use('/borrower', borrowersRouter);
app.use('/borrow', borrowRouter);
app.use('/borrowdetail', borrowdetailRouter);

function verifyToken(req, res, next) {
  const token = req.cookies.token || '';
  console.log("here :  "+token);
  try {
    if (!token) {
      return res.status(401).json('You need to Login')
    }
    const decrypt = jwt.verify(token, process.env.MY_TOKEN);
    req.user = {
      username: decrypt.username,
    };
    next();
  } catch (err) {
    return res.status(500).json(err.toString());
  }
};


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    console.log("token = "+token);
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.MY_TOKEN, (err, user) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }


module.exports = app;
