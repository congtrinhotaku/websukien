var express = require('express');
var router = express.Router();

const userController = require("../controllers/userController");
const eventController = require("../controllers/CreateEventContro");
const upload = require("../helpers/multer"); 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/createEvent', eventController.loadCreateEvent);
// Dùng upload.fields để nhận nhiều file
router.post(
  "/createEvent",
  upload.fields([
    { name: "cover_image", maxCount: 1 },
    { name: "banner_image", maxCount: 1 }
  ]),
  eventController.createEvent
);





module.exports = router;
