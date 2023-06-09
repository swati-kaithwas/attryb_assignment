var express = require('express');
var router = express.Router();
const carcontroller =require("../controller/car")
const {upload} = require("../helper/multer")
/* GET home page. */
router.use((req, res, next) => {
  console.log(
    "TEST ROUTE: " + req.originalUrl + "::" + new Date().toISOString()
  );
  next();
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/createcar", upload.single("car_images"),carcontroller.createCar)
router.get("/getallcar",carcontroller.getAllCar)
router.post("/getcarbyid",carcontroller.getCarById)
router.post("/updatecar/", carcontroller.UpadteCar);
router.delete("/deletecar/:id", carcontroller.deleteCar);

module.exports = router;