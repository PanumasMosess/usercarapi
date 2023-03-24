const express = require("express");
const router = express.Router();

const carsController = require("../controller/cars.controller");

router.post("/login", carsController.apiLogin);
router.post("/refirshToken", carsController.apiRefirshToken);


module.exports = router;