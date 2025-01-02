const express = require("express");
const router = express.Router();

const location = require("../models/location");

router.post("/location", location.createLocation);
router.post("/location/user", location.addLocationToUser);
router.get("/location", location.getLocations);
router.get("/location/:id", location.getOneLocation);
router.put("/location/:id", location.updateLocation);
router.delete("/location/:id", location.deleteLocation);

module.exports = router;

