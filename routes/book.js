var express = require('express');
var router = express.Router();
const book=require('../model/book_model');

//Antaa kaikki kirjat
router.get('/', 
    function(request, response) {
        let data=book.getAllBooks();
        response.send(data);
});

//Antaa yhden kirjan
router.get('/:id',
    function(request, response){
        let id=request.params.id;
        let data=book.getOneBook(id);
        response.send(data);
    }
);

//Lisää kirjan
router.post('/',
    function(request,response){
        let data=book.addBook(request.body);
        response.send(data);
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