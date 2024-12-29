const {runQuery} = require("../config/neo4j");

const createUser = async (name, email, password) => {
  const query = `
    CREATE (u:User {name: $name, email: $email})
    RETURN u
  `;
  try {
    const result = await runQuery(query, { name, email });
    console.log("Neo4j result:", result);
    return result.records[0].get("u").properties;
  } catch (error) {
    console.error("Error creating user in Neo4j:", error);
    throw new Error("Error creating user in Neo4j");
  }
};

module.exports = { createUser };
