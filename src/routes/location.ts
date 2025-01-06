import express from "express";
import authenticateToken from "../middlewares/authMiddlerware";
import location from "../controllers/locationController";
const router = express.Router();

router.post("/location", location.createLocation);
router.post("/location/user", authenticateToken, location.addLocationToUser);
router.get("/location", authenticateToken, location.getLocations);
router.get("/location/:id", authenticateToken, location.getOneLocation);
router.put("/location/:id", authenticateToken, location.updateLocation);
router.delete("/location/:id", authenticateToken, location.deleteLocation);

export default router;
