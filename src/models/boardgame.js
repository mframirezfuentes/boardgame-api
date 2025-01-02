const { runQuery } = require("../config/neo4j");

const createUser = async (name, email) => {
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

const getUsers = async () => {
  const query = `
    MATCH (u:User)
    RETURN u
  `;
  const result = await runQuery(query);
  return result.records.map((record) => record.get("u").properties);
};

const addGameToUser = async (userId, gameId) => {
  const query = `
    MATCH (u:User {id: $userId})
    MATCH (g:Game {id: $gameId})
    MERGE (u)-[:PLAYS]->(g)
  `;
  await runQuery(query, { userId, gameId });
};

const createBoardgame = async (title, year, author) => {
  const query = `
    CREATE (b:BoardGame {title: $title, year: $year})
    MERGE (a:Author {name: $author})
    CREATE (b)-[:CREATED_BY]->(a)
    RETURN b
  `;
  try {
    const result = await runQuery(query, { title, year, author });
    console.log("Neo4j result:", result);
    return result.records[0].get("b").properties;
  } catch (error) {
    console.error("Error creating boardgame in Neo4j:", error);
    throw new Error("Error creating boardgame in Neo4j");
  }
};

const deleteBoardgame = async (id) => {
  const query = `
    MATCH (b:BoardGame {id: $id})
    DETACH DELETE b
  `;
  await runQuery(query, { id });
};

const getBoardgame = async () => {
  const query = `
    MATCH (b:BoardGame)
    RETURN b
  `;
  const result = await runQuery(query);
  return result.records.map((record) => record.get("b").properties);
};

const getOneBoardgame = async (id) => {
  try {
    const query = `MATCH (b:BoardGame {id: $id}) RETURN b`;
    const result = await runQuery(query, { id });
    return result.records[0].get;
  } catch (error) {
    console.log("Error to find boardgame");
    res.status(500).json({ message: "Error to find boardgame" });
  }
};

module.exports = {
  createBoardgame,
  deleteBoardgame,
  createUser,
  getUsers,
  addGameToUser,
  getOneBoardgame,
  getBoardgame,
};
