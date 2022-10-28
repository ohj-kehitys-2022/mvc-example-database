var express = require('express');
var router = express.Router();
const borrow=require('../model/borrow_model');

//Antaa kaikki lainat
router.get('/', 
    function(request, response) {
        borrow.getBorrowedData(function(err, dbResult){
            if(err){
                response.json(err);
            }
            else{
                response.json(dbResult);
            }

        });
});

module.exports=router;