import express from "express";
import location from "../controllers/locationController";
const router = express.Router();

router.post("/location", location.createLocation);
router.post("/location/user", location.addLocationToUser);
router.get("/location", location.getLocations);
router.get("/location/:id", location.getOneLocation);
router.put("/location/:id", location.updateLocation);
router.delete("/location/:id", location.deleteLocation);

export default router;
