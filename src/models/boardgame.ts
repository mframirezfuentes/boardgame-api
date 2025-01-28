import { runQuery } from "../config/neo4j";
import { v4 as uuidv4 } from "uuid";
import authorModel from "./author";

const createUser = async (name: String, email: String) => {
  const query = `
    CREATE (u:User {name: ${name}, email: ${email}})
    RETURN u
  `;
  try {
    const result = await runQuery(query);
    console.log("Neo4j result:", result);
    if (result && result.records[0]) {
      return result.records[0].get("u").properties;
    } else {
      throw new Error("No records found");
    }
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
  if (result && result.records) {
    return result.records.map((record: any) => record.get("u").properties);
  } else {
    throw new Error("No records found");
  }
};

const addGameToUser = async (userId: String, gameId: String) => {
  const query = `
    MATCH (u:User {id: ${userId}})
    MATCH (g:Game {id: ${gameId}})
    MERGE (u)-[:PLAYS]->(g)
  `;
  await runQuery(query);
};

const createBoardgame = async (title: String, year: number, author: String) => {
  const query = `
    MATCH(a:Author {name: "${author}"})
    CREATE (b:BoardGame {title: "${title}", year: ${year}, id: "${uuidv4()}"})
    CREATE (b)-[:CREATED_BY]->(a)
    RETURN b
  `;
  try {
    const findAuthor = await authorModel.getOneAuthor(author);
    if(!findAuthor) {
      return null;
    }
    const result = await runQuery(query);

    return result?.records[0].get("b").properties;
  } catch (error) {
    console.error("Error creating boardgame in Neo4j:", error);
    throw new Error("Error creating boardgame in Neo4j");
  }
};

const deleteBoardgame = async (id: String) => {
  const query = `
    MATCH (b:BoardGame {id: "${id}"})
    DETACH DELETE b
  `;
  await runQuery(query);
};

const getBoardgame = async () => {
  try {
    const query = `
      MATCH (b:BoardGame)
      RETURN b
    `;
    const result = await runQuery(query);

    return result?.records.map((record: any) => record.get("b").properties);
  } catch (error) {
    console.error("Error fetching boardgames from Neo4j:", error);
    throw new Error("Error fetching boardgames");
  }
};

const getOneBoardgame = async (id: String) => {
  try {
    const query = `MATCH (b:BoardGame {id: "${id}"}) RETURN b`;
    const result = await runQuery(query);

    return result?.records[0].get("b").properties;
  } catch (error) {
    console.log("Error to find boardgame");
  }
};

const updateBoardgame = async (id: String, title: String, year: number) => {
  try {
    const query = `
  MATCH (b:BoardGame {id: "${id}"})
  SET b.title = "${title}", b.year = ${year}
`;
    await runQuery(query);
  } catch (error) {
    console.log("error to modify boardgame", error);
  }
};

export default {
  createUser,
  getUsers,
  addGameToUser,
  createBoardgame,
  deleteBoardgame,
  getBoardgame,
  getOneBoardgame,
  updateBoardgame,
};
