var express = require('express');
var router = express.Router();

//Antaa kaikki kirjat
router.get('/', 
    function(request, response) {
        response.send('näytetään kirjat');
});

//Antaa yhden kirjan
router.get('/:id',
    function(request, response){
        let id=request.params.id;
        response.send('näytetään kirja, jonka id='+id);
    }
);

//Lisää kirjan
router.post('/',
    function(request,response){
        response.send(request.body);
    }
);

//Päivittää kirjan
router.put('/:id',
    function(request,response){
        let id=request.params.id;
        response.send('päivitetään kirja '+id);
    }
);

//Poistaa kirjan
router.delete('/:id',
    function(request,response){
        let id=request.params.id;
        response.send('poistetaan kirja '+id);
    }
);

module.exports = router;