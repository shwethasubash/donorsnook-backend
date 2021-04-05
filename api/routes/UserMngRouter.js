// Author Jigar B00842568
const express = require("express");
const userMngController = require("../controller/UserMngController");
const router = express.Router();

router.get("/getUsers", userMngController.getAllUsers);
router.post("/getSpecificUser", userMngController.getSpecificUser);
router.post("/login", userMngController.loginUser);
router.post("/registerUser", userMngController.registerUser);
router.delete("/deleteUser/:userId", userMngController.deleteUser);
module.exports = router;
