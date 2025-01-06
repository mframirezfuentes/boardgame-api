const { runQuery } = require("../config/neo4j");
const {v4: uuidv4} = require("uuid");

const createLocation = async (name:  String, address: String) => {
  const query = `
        CREATE (l:Location {id:"${uuidv4()}",name: "${name}", address: "${address}"})
        RETURN l
    `;
  try {
    const result = await runQuery(query);
    console.log("Neo4j result:", result);
    return result.records[0].get("l").properties;
  } catch (error) {
    console.error("Error creating location in Neo4j:", error);
    throw new Error("Error creating location in Neo4j");
  }
};

const getLocations = async () => {
  const query = `
        MATCH (l:Location)
        RETURN l
    `;
  const result = await runQuery(query);
  return result?.records?.map((record: any) => record.get("l").properties);
};

const getOneLocation = async (locationId: String) => {
  const query = `
        MATCH (l:Location {id: $locationId})
        RETURN l
    `;
  const result = await runQuery(query, { locationId });
  return result?.records?.map((record: any) => record.get("l").properties);
};

const addLocationToUser = async (userId: String, locationId: String) => {
  const query = `
      MATCH (u:User {id: $userId})
      MATCH (l:Location {id: $locationId})
      MERGE (u)-[:VISITS]->(l)
    `;
  await runQuery(query, { userId, locationId });
};

const updateLocation = async (
  locationId: String,
  name: String,
  address: String
) => {
  const query = `
        MATCH (l:Location {id: $locationId})
        SET l.name = $name, l.address = $address
        RETURN l
    `;
  const result = await runQuery(query, { locationId, name, address });
  return result.records[0].get("l").properties;
};

const deleteLocation = async (locationId: String) => {
  const query = `
        MATCH (l:Location {id: $locationId})
        DETACH DELETE l
    `;
  await runQuery(query, { locationId });
};

export default {
  createLocation,
  getLocations,
  getOneLocation,
  addLocationToUser,
  updateLocation,
  deleteLocation,
};
