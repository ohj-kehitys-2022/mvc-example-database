const db=require('../database');

const borrow={
    getAllBorrows: function(callback){
        return db.query('select id_borrows,id_borrower,id_book,DATE_FORMAT(borrow_date,"%d.%m.%Y") as "borrow_date", DATE_FORMAT(return_date,"%d.%m.%Y") as "return_date" from borrows;',callback);
    },
    getOneBorrow: function(id,callback){
        return db.query('select id_borrows,id_borrower,id_book,DATE_FORMAT(borrow_date,"%d.%m.%Y") as "borrow_date", DATE_FORMAT(return_date,"%d.%m.%Y") as "return_date" from borrows where id_borrows=?',[id],callback);
    },
    addBorrow: function(insertData,callback){
        if(insertData.borrow_date==null){
            return db.query('insert into borrows(id_borrower,id_book, return_date) values(?,?,?)',
            [insertData.id_borrower, insertData.id_book, insertData.return_date],callback);
        }
        else {
            return db.query('insert into borrows(id_borrower,id_book, borrow_date, return_date) values(?,?,?,?)',
            [insertData.id_borrower, insertData.id_book, insertData.borrow_date, insertData.return_date],callback);
        }

    },
    updateBorrow:function(id,updateData,callback){
        return db.query('update borrows set id_borrower=?, id_book=?, borrow_date=?, return_date=? where id_borrows=?',[updateData.id_borrower, updateData.id_book, updateData.borrow_date, updateData.return_date, id],callback);
    },
    deleteBorrow:function(id,callback){
        return db.query('delete from borrows where id_borrows=?',[id],callback);
    },
    getBorrowedData:function(callback){
        return db.query('select fname, lname, name, DATE_FORMAT(borrow_date,"%d.%m.%Y") as "borrow_date",DATE_FORMAT(return_date,"%d.%m.%Y") as "return_date" from borrower inner join borrows on borrower.id_borrower=borrows.id_borrower inner join book on book.id_book=borrows.id_book',callback);
    }
}

module.exports=borrow;