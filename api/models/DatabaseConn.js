const mysql566 = require('mysql2');
const {
    Stream
} = require('nodemailer/lib/xoauth2');
var Client = require('ssh2').Client;
var ssh566 = new Client();

var db566 = new Promise((resolve, reject) => {

    var db = mysql566.createConnection({
        host: 'donorsnook.citwdrwunazn.us-east-1.rds.amazonaws.com',
        user: "test",
        password: 'test1234',
        port: 3306,
        database: 'donorNookDB'
    });

    // send connection back in variable depending on success or not
    db.connect(function (err) {
        if (err) {
            console.log("Database connection failed!")
            //resolve(connection);
            reject(err);
        } else {
            resolve(db);
        }
    });

}).catch((err) => {
    if (err) throw "promise error";
})

exports.db566 = db566;
