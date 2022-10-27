const db = require('../database');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const borrower = {
    getAllBorrowers: function (callback) {
        return db.query('select * from borrower', callback);
    },
    getOneBorrower: function (id, callback) {
        return db.query('select * from borrower where id_borrower=?', [id], callback);
    },
    addBorrower: function (insertData, callback) {
        bcrypt.hash(insertData.password, saltRounds, function (err, hashedPassword) {
            return db.query('insert into borrower values(?,?,?,?)',
                [insertData.id_borrower, insertData.fname, insertData.lname, hashedPassword], callback);
        });
    },
    updateBorrower: function (id, updateData, callback) {
        bcrypt.hash(updateData.password, saltRounds, function (err, hashedPassword) {
            return db.query('update borrower set fname=?, lname=?, password=? where id_borrower=?', [updateData.fname, updateData.lname, hashedPassword, id], callback);
        })

    },
    deleteBorrower: function (id, callback) {
        return db.query('delete from borrower where id_borrower=?', [id], callback);
    },
    checkPassword: function(id_borrower, callback) {
        return db.query('select password from borrower where id_borrower=?',[id_borrower], callback);
    }
}

module.exports = borrower;