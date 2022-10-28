var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./database');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/book');
var borrowersRouter = require('./routes/borrower');
var loginRouter = require('./routes/login');

const basicAuth = require('express-basic-auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//SUOJAAMATTOMAT ENDPOINTIT
app.use('/login', loginRouter);

//SUOJATUT ENDPOINTIT
    //kovakoodattu versio
    //app.use(basicAuth({users: { 'admin': '1234' }}))
    //Autentikointi tietokantaa käyttäen
    app.use(basicAuth( { authorizer: myAuthorizer, authorizeAsync:true, } ))
app.use('/book', booksRouter);
app.use('/borrower', borrowersRouter);


function myAuthorizer(username, password,cb){
    db.query('SELECT password FROM borrower WHERE id_borrower = ?',[username], 
      function(dbError, dbResults, fields) {
        if(dbError){
              response.json(dbError);
            }
        else {
          if (dbResults.length > 0) {
            bcrypt.compare(password,dbResults[0].password, 
              function(err,res) {
                if(res) {
                  console.log("succes");
                  return cb(null, true);
                }
                else {
                  console.log("wrong password");
                  return cb(null, false);
                }			
                response.end();
              }
            );
          }
          else{
            console.log("user does not exists");
            return cb(null, false);
          }
        }
      }
    );
  }


module.exports = app;
