const neo4j = require("neo4j-driver");
require("dotenv").config();

let driver;

const getNeo4jDriver = async () => {
  if (driver) {
    return driver;
  }
  driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASS)
  );
  return driver;
};

const runQuery = async (query, params) => {
  try {
    const neo4jDriver = await getNeo4jDriver();
    const session = neo4jDriver.session();
    const response = await session.run(query, params);
    session.close();
    return response;
  } catch (error) {
    console.error("Error querying Neo4j:", error);
    throw new Error("Error querying Neo4j");
  }
};


module.exports = { getNeo4jDriver, runQuery };