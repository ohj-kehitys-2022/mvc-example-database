const book={
    getAllBooks: function(){
        return 'Model palauttaa kaikki kirjat';
    },
    getOneBook: function(id){
        return 'Model palauttaa kirjan : '+id;
    },
    addBook: function(insertData){
        return insertData;
    },
    updateBook:function(id){
        return 'Model päivittää kirjan '+id;
    },
    deleteBook:function(id){
        return 'Model poistaa kirjan '+id;
    }
}

module.exports=book;