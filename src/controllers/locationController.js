const location = require("../models/location");

exports.createLocation = async (req, res) => {
  try {
    const newLocation = await location.createLocation(req.body);
    res.status(201).json(newLocation);
  } catch (error) {
    console.log("Error to create location", error);
    res.status(500).json({ message: "Error to create location" });
  }
};

exports.getLocations = async (req, res) => {
    try {
        const locations = await location.getLocations();
        res.status(200).json(locations);
    } catch (error) {
        console.log("Error to find locations");
        res.status(500).json({ message: "Error to find locations" });
    }
}
exports.getOneLocation = async (req, res) => {
    try {
        const locationId = req.params.id;
        const locationData = await location.getOneLocation(locationId);
        res.status(200).json(locationData);
    } catch (error) {
        console.log("Error to find location");
        res.status(500).json({ message: "Error to find location" });
    }
}

exports.addLocationToUser = async (req, res) => {
    try {
        const { userId, locationId } = req.body;
        await location.addLocationToUser(userId, locationId);
        res.status(200).json({ message: "Location added to user" });
    } catch (error) {
        console.log("Error to add location to user", error);
        res.status(500).json({ message: "Error to add location to user" });
    }
}

exports.updateLocation = async (req, res) => {
    try {
        const locationId = req.params.id;
        const { name, address } = req.body;
        await location.updateLocation(locationId, name, address);
        res.status(200).json({ message: "Location updated" });
    } catch (error) {
        console.log("Error to update location", error);
        res.status(500).json({ message: "Error to update location" });
    }
}

exports.deleteLocation = async (req, res) => {
    try {
        const locationId = req.params.id;
        await location.deleteLocation(locationId);
        res.status(200).json({ message: "Location deleted" });
    } catch (error) {
        console.log("Error to delete location", error);
        res.status(500).json({ message: "Error to delete location" });
    }
}