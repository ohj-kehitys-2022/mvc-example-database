const db=require('../database');

const book={
    getAllBooks: function(callback){
        return db.query('select * from book',callback);
    },
    getOneBook: function(id,callback){
        return db.query('select * from book where id_book=?',[id],callback);
    },
    addBook: function(insertData,callback){
        return db.query('insert into book(name,author,isbn) values(?,?,?)',
        [insertData.name, insertData.author, insertData.isbn],callback);
    },
    updateBook:function(id){
        return 'Model päivittää kirjan '+id;
    },
    deleteBook:function(id){
        return 'Model poistaa kirjan '+id;
    }
}

module.exports=book;