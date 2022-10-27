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
                response.send(dbResult);
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
                response.send(dbResult);
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
                response.send(dbResult);
            }
        });

    }
);

//Päivittää kirjan
router.put('/:id',
    function(request,response){
        let id=request.params.id;
        let data=book.updateBook(id);
        response.send(data);
    }
);

//Poistaa kirjan
router.delete('/:id',
    function(request,response){
        let id=request.params.id;
        let data=book.deleteBook(id);
        response.send(data);
    }
);

module.exports = router;