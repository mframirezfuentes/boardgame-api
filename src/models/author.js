const { runQuery } = require("../config/neo4j");

const createAuthor = async (name) => {
  const query = `
    CREATE (a:Author {name: $name})
    RETURN a
  `;
  try {
    const result = await runQuery(query, { name });
    console.log("Neo4j result:", result);
    return result.records[0].get("a").properties;
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
  return result.records.map((record) => record.get("a").properties);
};

const getOneAuthor = async (authorId) => {
  const query = `
    MATCH (a:Author {id: $authorId})
    RETURN a
  `;
  const result = await runQuery(query, { authorId });
  return result.records.map((record) => record.get("a").properties);
};

const updateAuthor = async (authorId, name) => {
  const query = `
    MATCH (a:Author {id: $authorId})
    SET a.name = $name
    RETURN a
  `;
  const result = await runQuery(query, { authorId, name });
  return result.records[0].get("a").properties;
};

const deleteAuthor = async (authorId) => {
  const query = `
    MATCH (a:Author {id: $authorId})
    DETACH DELETE a
  `;
  await runQuery(query, { authorId });
};

module.exports = {
  createAuthor,
  getAuthors,
  getOneAuthor,
  updateAuthor,
  deleteAuthor,
};
