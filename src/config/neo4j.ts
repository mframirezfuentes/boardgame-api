import neo4j, { Driver, QueryResult, RecordShape, Session } from "neo4j-driver";
import "dotenv/config";

let driver: Driver;

const getNeo4jDriver = async (): Promise<Driver> => {
  if (driver) {
    return driver;
  }

  const uri = process.env.NEO4J_URI;
  const user = process.env.NEO4J_USER;
  const pass = process.env.NEO4J_PASS;

  if (!uri || !user || !pass) {
    throw new Error(
      "❌ Variables de entorno faltantes: NEO4J_URI, NEO4J_USER, NEO4J_PASS"
    );
  }
  driver = neo4j.driver(
    process.env.NEO4J_URI!,
    neo4j.auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASS!)
  );
  return driver;
};

export const runQuery = async (
  query: string,
  params: Record<string, any> = {}
): Promise<QueryResult<RecordShape> | undefined> => {
  try {
    const neo4jdriver = await getNeo4jDriver();
    const session: Session = neo4jdriver.session();
    const response = await session.run(query, params);
    await session.close();
    return response;
  } catch (error) {
    console.error("❌ Error en la consulta Neo4j:", error);
    throw new Error("Error querying Neo4j");
  }
};

export default getNeo4jDriver;
