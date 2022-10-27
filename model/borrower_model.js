const db=require('../database');

const borrower={
    getAllBorrowers: function(callback){
        return db.query('select * from borrower',callback);
    },
    getOneBorrower: function(id,callback){
        return db.query('select * from borrower where id_borrower=?',[id],callback);
    },
    addBorrower: function(insertData,callback){
        return db.query('insert into borrower values(?,?,?,?)',
        [insertData.id_borrower, insertData.fname, insertData.lname, insertData.password],callback);
    },
    updateBorrower:function(id,updateData,callback){
        return db.query('update borrower set fname=?, lname=?, password=? where id_borrower=?',[updateData.fname, updateData.lname, updateData.password, id],callback);
    },
    deleteBorrower:function(id,callback){
        return db.query('delete from borrower where id_borrower=?',[id],callback);
    }
}

module.exports=borrower;