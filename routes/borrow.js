var express = require('express');
var router = express.Router();
const borrow=require('../model/borrow_model');

//Antaa kaikki lainat
router.get('/', 
    function(request, response) {
        borrow.getAllBorrows(function(err, dbResult){
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
        borrow.getOneBorrow(id, function(err,dbResult){
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
        borrow.addBorrow(request.body,function(err,dbResult){
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
        borrow.updateBorrow(id,request.body,function(err,dbResult){
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
        borrow.deleteBorrow(id,function(err,dbResult){
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