import { Request, Response } from "express";
import location from "../models/location";

const createLocation = async (req: Request, res: Response) => {
  try {
    const { name, address } = req.body;
    const newLocation = await location.createLocation(name, address);
    res.status(201).json(newLocation);
  } catch (error) {
    console.log("Error to create location", error);
    res.status(500).json({ message: "Error to create location" });
  }
};

const getLocations = async (_req: Request, res: Response) => {
  try {
    const locations = await location.getLocations();
    res.status(200).json(locations);
  } catch (error) {
    console.log("Error to find locations");
    res.status(500).json({ message: "Error to find locations" });
  }
};
const getOneLocation = async (req: Request, res: Response) => {
  try {
    const locationId = req.params.id;
    const locationData = await location.getOneLocation(locationId);
    res.status(200).json(locationData);
  } catch (error) {
    console.log("Error to find location");
    res.status(500).json({ message: "Error to find location" });
  }
};

const addLocationToUser = async (req: Request, res: Response) => {
  try {
    const { userId, locationId } = req.body;
    await location.addLocationToUser(userId, locationId);
    res.status(200).json({ message: "Location added to user" });
  } catch (error) {
    console.log("Error to add location to user", error);
    res.status(500).json({ message: "Error to add location to user" });
  }
};

const updateLocation = async (req: Request, res: Response) => {
  try {
    const locationId = req.params.id;
    const { name, address } = req.body;
    await location.updateLocation(locationId, name, address);
    res.status(200).json({ message: "Location updated" });
  } catch (error) {
    console.log("Error to update location", error);
    res.status(500).json({ message: "Error to update location" });
  }
};

const deleteLocation = async (req: Request, res: Response) => {
  try {
    const locationId = req.params.id;
    await location.deleteLocation(locationId);
    res.status(200).json({ message: "Location deleted" });
  } catch (error) {
    console.log("Error to delete location", error);
    res.status(500).json({ message: "Error to delete location" });
  }
};

export default {
  createLocation,
  getLocations,
  getOneLocation,
  addLocationToUser,
  updateLocation,
  deleteLocation,
};
