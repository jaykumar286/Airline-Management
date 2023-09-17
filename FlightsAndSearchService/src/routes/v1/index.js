const express = require("express");
const { CityController,FlightController } = require("../../controllers/index");

const router = express.Router();

router.post("/city", CityController.create);
router.get("/city/:id", CityController.get);
router.get("/city", CityController.getAll);
router.patch("/city/:id", CityController.update);
router.delete("/city/:id", CityController.destroy);

router.post("/flights",FlightController.create);
router.get("/flights",FlightController.getAll);
module.exports = router;
