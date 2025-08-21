var express = require('express');
var router = express.Router();

const userController = require("../controllers/userController");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('trangchu', { });
});

router.get("/register", userController.loadSignup);
router.post("/register", userController.signup);
router.get("/login", userController.loadLogin);
router.post("/login", userController.login);

module.exports = router;
