const db=require('../database');

const borrow={
    getAllBorrows: function(callback){
        return db.query('select * from borrows',callback);
    },
    getOneBorrow: function(id,callback){
        return db.query('select * from borrows where id_borrows=?',[id],callback);
    },
    addBorrow: function(insertData,callback){
        return db.query('insert into borrows(id_borrower,id_book, borrow_date, return_date) values(?,?,?,?)',
        [insertData.id_borrower, insertData.id_book, insertData.borrow_date, insertData.return_date],callback);
    },
    updateBorrow:function(id,updateData,callback){
        return db.query('update borrows set id_borrower=?, id_book=?, borrow_date=?, return_date=? where id_borrows=?',[updateData.id_borrower, updateData.id_book, updateData.borrow_date, updateData.return_date, id],callback);
    },
    deleteBorrow:function(id,callback){
        return db.query('delete from borrows where id_borrows=?',[id],callback);
    }
}

module.exports=borrow;