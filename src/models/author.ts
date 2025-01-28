import { runQuery } from "../config/neo4j";

const createAuthor = async (name: String) => {
  const query = `
    CREATE (a:Author {name: ${name}})
    RETURN a
  `;
  try {
    const result = await runQuery(query);
    return result?.records[0].get("a").properties;
  } catch (error) {
    console.error("Error creating author in Neo4j:", error);
    throw new Error("Error creating author in Neo4j");
  }
};

const getAuthors = async () => {
  const query = `
    MATCH (a:Author)
    RETURN a
  `;
  const result = await runQuery(query);
  return result?.records.map((record) => record.get("a").properties);
};

const getOneAuthor = async (name: String) => {
  const query = `
    MATCH (a:Author {name: ${name}})
    RETURN acl
  `;
  try {
    const result = await runQuery(query);
    return result?.records.map((record) => record.get("a").properties) || [];
  } catch (error) {
    console.error("Error fetching author from Neo4j:", error);
    throw new Error("Error fetching author from Neo4j");
  }
};

const updateAuthor = async (id: String) => {
  const query = `
    MATCH (a:Author {id: "${id}"})
    SET a.id = ${id}
    RETURN a
  `;
  const result = await runQuery(query);
  return result?.records[0].get("a").properties;
};

const deleteAuthor = async (id: String) => {
  const query = `
    MATCH (a:Author {id: "${id}"})
    DETACH DELETE a
  `;
  await runQuery(query);
};

export default {
  createAuthor,
  getAuthors,
  getOneAuthor,
  updateAuthor,
  deleteAuthor,
};
