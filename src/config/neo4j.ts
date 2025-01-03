import neo4j, { Driver, QueryResult, RecordShape, Session } from "neo4j-driver";

let driver: Driver;

const getNeo4jDriver = async (): Promise<Driver> => {
  if (driver) {
    return driver;
  }
  driver = neo4j.driver(
    process.env.NEO4J_URI!,
    neo4j.auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASS!)
  );
  return driver;
};

export const runQuery = async (
  query: string
): Promise<QueryResult<RecordShape> | undefined> => {
  try {
    const neo4jdriver = await getNeo4jDriver();
    const session: Session = neo4jdriver.session();
    const response = await session.run(query);
    session.close();
    return response;
  } catch (error) {
    throw new Error("Error querying Neo4j");
  }
};

export default getNeo4jDriver;
