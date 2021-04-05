//Author - Jigar Makwana B00842568
const UserMngObjModel = require("../models/userModel");

exports.getAllUsers = (req, res) => {
  UserMngObjModel._getAllUsers((err, succ) => {
    if (err) {
      res.send(err);
    }
    res.json(succ);
  });
};

//Author - Jigar Makwana B00842568
exports.getSpecificUser = (req, res) => {
  UserMngObjModel._getSpecificUser(req.body, (err, succ) => {
    if (err) {
      res.send(err);
    }
    res.json(succ);
  });
};

//Author - Jigar Makwana B00842568
exports.loginUser = (req, res) => {
  UserMngObjModel._loginUser(req.body, (err, succ) => {
    if (err) {
      res.send(err);
    }
    res.json(succ);
  });
};

//Author - Jigar Makwana B00842568
exports.registerUser = (req, res) => {
  UserMngObjModel._registerUser(req.body, (err, succ) => {
    if (err) {
      res.send(err);
    }
    res.send(succ);
  });
};

//Author - Jigar Makwana B00842568
exports.deleteUser = (req, res) => {
  UserMngObjModel._deleteUser(req.params.userId, (err, succ) => {
    if (err) {
      res.send("error occured -- controller");
    }
    res.json(succ);
  });
};
