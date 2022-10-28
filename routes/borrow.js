var express = require('express');
var router = express.Router();
const Borrow=require('../model/borrow_model');

//Antaa kaikki lainat
router.get('/', 
    function(request, response) {
        Borrow.getAllBorrows(function(err, dbResult){
            if(err){
                response.json(err);
            }
            else{
                response.json(dbResult);
            }

        });
});

//Antaa yhden lainan
router.get('/:id',
    function(request, response){
        let id=request.params.id;
        console.log(id);
        Borrow.getOneBorrow(id, function(err,dbResult){
            if(err){
                response.json(err);
            }
            else{
                response.json(dbResult[0]);
            }
        });
    }
);

//Lisää lainan
router.post('/',
    function(request,response){
        Borrow.addBorrow(request.body,function(err,dbResult){
            if(err){
                response.json(err);
            }
            else{
                response.json(dbResult);
            }
        });

    }
);

//Päivittää lainan
router.put('/:id',
    function(request,response){
        let id=request.params.id;
        Borrow.updateBorrow(id,request.body,function(err,dbResult){
            if(err){
                response.json(err);
            }
            else{
                response.json(dbResult.affectedRows);
            }
        });
    }
);

//Poistaa lainan
router.delete('/:id',
    function(request,response){
        let id=request.params.id;
        Borrow.deleteBorrow(id,function(err,dbResult){
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