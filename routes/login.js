const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const borrower = require('../model/borrower_model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

router.post('/', 
  function(request, response) {
    if(request.body.id_borrower && request.body.password){
      const id_borrower = request.body.id_borrower;
      const loginPassword = request.body.password;
        borrower.checkPassword(id_borrower, function(dbError, dbResult) {
          if(dbError){
            response.json(dbError);
          }
          else{
            if (dbResult.length > 0) {
              bcrypt.compare(loginPassword,dbResult[0].password, function(err,compareResult) {
                if(compareResult) {
                  console.log("succes");
                  generateAccessToken(response,{ username: id_borrower});
                  response.send(true);
                }
                else {
                    console.log("wrong password");
                    response.json(false);
                }			
              }
              );
            }
            else{
              console.log("user does not exists");
              response.json(false);
            }
          }
          }
        );
      }
    else{
      console.log("id_borrower or password missing");
      response.json(false);
    }
  }
);

function generateAccessToken(response,username) {
  dotenv.config();
  const expiration=100;
  const token= jwt.sign(username, process.env.MY_TOKEN, { expiresIn: '60s' });
  console.log("token = "+token);
  return response.cookie('token',token,{
    expiration:expiration,
    secure: false, // set to true if your using https
    httpOnly: true,
  });
}

module.exports=router;