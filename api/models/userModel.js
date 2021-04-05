var connection = require("./DatabaseConn");
const {
  NULL
} = require("mysql2/lib/constants/types");
const bcrypt = require("bcryptjs");
var Obj = function () {};

//Author - Jigar Makwana B00842568
// @route GET api /usermng/getusers
// @desc get users
// @access Public
//GET Route to fetch all the users from DB
Obj._getAllUsers = (res) => {
  connection.db566.then(function (connection) {
    let sql = "select * from users";
    let query = connection.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res(err, null);
      }
      res(null, result);
    });
  });
};

//Author - Jigar Makwana B00842568
// @route GET api /usermng/getSpecificUser
// @desc get specific user by email id
// @access Public
//POST Route to fetch the specific user using email id from DB
Obj._getSpecificUser = (req, res) => {
  connection.db566.then(function (connection) {
    // console.log("-----------------");
    // console.log("in _getSpecificUser");
    const email = req.user.email;
    // console.log("_getSpecificUser " + email);
    let where = "email = ?";
    let sqlSelect = "SELECT * FROM users WHERE " + where;
    let query = connection.query(sqlSelect, email, (err, result) => {
      if (err) {
        console.log(err);
        res(err, null);
      } else if (result.length === 0) {
        console.log(
          "_getSpecificUser: Email Id is not registered with Donor's Nook"
        );
        res(null);
      } else {
        // console.log(result);
        // console.log("_getSpecificUser: This is userid: " + result[0].userId);
        res(null, result);
      }
    });
  });
};


//Author - Jigar Makwana B00842568
// @route GET api /usermng/login
// @desc get users
// @access Public
//POST Route to login the user
Obj._loginUser = (req, res) => {
  console.log(req);
  const password = req.user.password;
  const email = req.user.email;
  let where = "email = ?";
  let sqlSelect = "SELECT * FROM users WHERE " + where;
  connection.db566.then(function (connection) {
    let query = connection.query(sqlSelect, email, (err, result) => {
      if (err) {
        console.log(err);
        res(err, null);
      } else if (result.length === 0) {
        console.log("Email Id is not registered with Donor's Nook");
        res(null);
      } else {
        console.log(result);
        const hashedPassword = result[0].password;

        // Check password
        bcrypt.compare(password, hashedPassword, function(err, result) {
          if(result == true){
                console.log("Login successful!");
                res(null, result);
          } else{
                console.log("Invalid Password");
                res(null);
          }
        });
        // bcrypt.compare(password, hashedPassword).then((isMatch) => {
        //   if (isMatch) {
        //     console.log("Login successful!");
        //     res(null, result);
        //   } else {
        //     console.log("Invalid Password");
        //     res(null);
        //   }
        // });
      }
    });
  });
};

//Author - Jigar Makwana B00842568
// @route POST api /usermng/registerUser
// @desc Register user
// @access Public
//POST Route to register a user record in DB
Obj._registerUser = (req, res) => {
  console.log("_registerUser");
  let where = "email = ?";
  let value = [req.user.email];
  let sqlSelect = "SELECT * FROM users WHERE " + where;
  connection.db566.then(function (connection) {
    let querySelect = connection.query(sqlSelect, value, (err1, result1) => {
      if (err1) {
        console.log(err1);
        res(err1, null);
      } else if (result1.length === 0) {
        // console.log(result1.length)
        console.log(
          "_registerUser: Email id is not found and to be inserted/pushed"
        );
        const sqlInsert = "INSERT INTO users SET ?";
        let unHashesPassword = req.user.password;
        bcrypt.hash(unHashesPassword, 10, function (err, hash) {
          let values = {
            email: req.user.email,
            password: hash,
          };
          connection.query(sqlInsert, values, function (err, result) {
            if (err) {
              console.log(err);
              res(err, null);
            } else {
              console.log(
                "_registerUser: User " +
                req.user.email +
                " added in users table"
              );
              console.log(result);
              res(null, result);
            }
          });
        });
      } else {
        console.log(
          "_registerUser: Email id " +
          req.user.email +
          " already exists in our database"
        );
        err = "Email id " + req.user.email + " already exists in our database";
        // res(err);
        res(null);
      }
    });
  });
};

//Author - Jigar Makwana B00842568
// @route DELETE api /usermng/deleteUser/:userId
// @desc Delete user
// @access Public
//DELETE Route to delete a user record from DB
Obj._deleteUser = (userId, result) => {
  console.log("inside delete api")
  let where = "userId = ?";
  let sqlSelect = "DELETE FROM users WHERE " + where;
  console.log(sqlSelect);
  connection.db566.then(function (connection) {
    connection.query(sqlSelect, userId, function (err, succ) {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        // console.log("User " + userId + " deleted from users table");
        // result(null, 'User ' + userId + ' deleted from users table');
        result(null, true);
      }
    });
  });
};

module.exports = Obj;
