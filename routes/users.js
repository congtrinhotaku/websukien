var express = require('express');
var router = express.Router();

const userController = require("../controllers/userController");
const eventController = require("../controllers/CreateEventContro");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/createEvent', eventController.loadCreateEvent);
router.post('/createEvent', eventController.createEvent);




module.exports = router;
