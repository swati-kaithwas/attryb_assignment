var express = require('express');
var router = express.Router();
const AuthController = require("../controller/user") 
const { jwtChecker } = require('../middleware/jwtAuth');
router.use((req, res, next) => {
  console.log(
    "TEST ROUTE: " + req.originalUrl + "::" + new Date().toISOString()
  );
  next();
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post("/signup",AuthController.signup);
router.post("/login",AuthController.login);
router.put("/updateprofile",AuthController.UpadteProfile);
router.get("/logout",jwtChecker,AuthController.logout);
module.exports = router;
