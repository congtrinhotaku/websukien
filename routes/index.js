var express = require('express');
var router = express.Router();

const userController = require("../controllers/userController");
const trangchuController = require("../controllers/trangchuController");





/* GET home page. */


router.get("/", trangchuController.getHomePage);
router.get("/register", userController.loadSignup);
router.post("/register", userController.signup);
router.get("/login", userController.loadLogin);
router.post("/login", userController.login);


module.exports = router;
