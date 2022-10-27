var express = require('express');
var router = express.Router();
const Borrower=require('../model/borrower_model');

//Antaa kaikki lainaajat
router.get('/', 
    function(request, response) {
        Borrower.getAllBorrowers(function(err, dbResult){
            if(err){
                response.json(err);
            }
            else{
                response.json(dbResult);
            }

        });
});

//Antaa yhden lainaajan
router.get('/:id',
    function(request, response){
        let id=request.params.id;
        console.log(id);
        Borrower.getOneBorrower(id, function(err,dbResult){
            if(err){
                response.json(err);
            }
            else{
                response.json(dbResult[0]);
            }
        });
    }
);

//Lisää lainaajan
router.post('/',
    function(request,response){
        Borrower.addBorrower(request.body,function(err,dbResult){
            if(err){
                response.json(err);
            }
            else{
                response.json(dbResult);
            }
        });

    }
);

//Päivittää lainaajan
router.put('/:id',
    function(request,response){
        let id=request.params.id;
        Borrower.updateBorrower(id,request.body,function(err,dbResult){
            if(err){
                response.json(err);
            }
            else{
                response.json(dbResult.affectedRows);
            }
        });
    }
);

//Poistaa lainaajan
router.delete('/:id',
    function(request,response){
        let id=request.params.id;
        Borrower.deleteBorrower(id,function(err,dbResult){
            if(err){
                response.json(err);
            }
            else{
                response.json(dbResult);
            }
        });
    }
);

module.exports = router;