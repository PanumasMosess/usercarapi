const express = require("express");
const router = express.Router();

const carsController = require("../controller/cars.controller");

router.get("/" ,carsController.getAllType);
router.get("/carGear", carsController.getAllGear);
router.get("/brands", carsController.getBrands);
router.get("/brand/:car_type_id", carsController.getBrandsByType);
router.get("/models/:brand_id", carsController.getModelsByBrand);
router.get("/submodels/:model_id", carsController.getSubModelsByModel);
router.get("/carGearBrand/:brand_id", carsController.getAllGearByBrand);
router.get("/carGearmodel/:model_id", carsController.getAllGearByModel);
router.get(
  "/carGearSubmodel/:sub_model_id",
  carsController.getAllGearBySubModel
);
router.get("/carYearBrand/:brand_id", carsController.getAllYearByBrand);
router.get("/carYearModel/:model_id", carsController.getAllYearByModel);
router.get(
  "/carYearSubmodel/:sub_model_id",
  carsController.getAllYearBySubModel
);
router.post("/searchPrice", carsController.getSearchPrice);

module.exports = router;
