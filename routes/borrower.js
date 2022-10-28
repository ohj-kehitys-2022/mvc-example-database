var express = require('express');
var router = express.Router();
const borrower=require('../model/borrower_model');

var path = require('path');

const filePath = path.join(__dirname, '../public/images/');
const multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePath)
  },
  filename: function (req, file, cb) {

      cb(null,  file.originalname );

  }
});

const upload = multer({ storage: storage})

//Antaa kaikki lainaajat
router.get('/', 
    function(request, response) {
        borrower.getAllBorrowers(function(err, dbResult){
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
        borrower.getOneBorrower(id, function(err,dbResult){
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
router.post('/',upload.single('file'),
    function(request,response){
        console.log(request.file.filename);
        borrower.addBorrower(request.body,request.file.filename,function(err,dbResult){
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
        borrower.updateBorrower(id,request.body,function(err,dbResult){
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
        borrower.deleteBorrower(id,function(err,dbResult){
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