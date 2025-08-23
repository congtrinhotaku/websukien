var express = require('express');
var router = express.Router();

const userController = require("../controllers/userController");
const trangchuController = require("../controllers/trangchuController");
const eventController = require("../controllers/CreateEventContro");





/* GET home page. */


router.get("/", trangchuController.getHomePage);
router.get("/register", userController.loadSignup);
router.post("/register", userController.signup);
router.get("/login", userController.loadLogin);
router.post("/login", userController.login);
router.get("/logout",trangchuController.logout);

//chi tiet su kien
router.get("/event/:id", eventController.getEventDetail);

// Hiển thị form đăng ký
router.get("/event/invite/:id", eventController.loadInviteForm);

// Xử lý đăng ký
router.post("/event/invite/:id", eventController.submitInviteForm);


module.exports = router;
