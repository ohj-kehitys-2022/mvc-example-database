var express = require('express');
var router = express.Router();
const book=require('../model/book_model');

//Antaa kaikki kirjat
router.get('/', 
    function(request, response) {
        book.getAllBooks(function(err, dbResult){
            if(err){
                response.json(err);
            }
            else{
                response.json(dbResult);
            }

        });
});

//Antaa yhden kirjan
router.get('/:id',
    function(request, response){
        let id=request.params.id;
        console.log(id);
        book.getOneBook(id, function(err,dbResult){
            if(err){
                response.json(err);
            }
            else{
                response.json(dbResult[0]);
            }
        });
    }
);

//Lisää kirjan
router.post('/',
    function(request,response){
        book.addBook(request.body,function(err,dbResult){
            if(err){
                response.json(err);
            }
            else{
                response.json(dbResult);
            }
        });

    }
);

//Päivittää kirjan
router.put('/:id',
    function(request,response){
        let id=request.params.id;
        book.updateBook(id,request.body,function(err,dbResult){
            if(err){
                response.json(err);
            }
            else{
                response.json(dbResult.affectedRows);
            }
        });
    }
);

//Poistaa kirjan
router.delete('/:id',
    function(request,response){
        let id=request.params.id;
        book.deleteBook(id,function(err,dbResult){
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