import loadAuthors from "./load_authors";
import loadBoardGames from "./load_boardgames";
import getNeo4jDriver from "../neo4j";

const loadData = async (): Promise<void> => {
  try {
    console.log("🚀 Iniciando la eliminación de datos en Neo4j...");
    await loadAuthors.deleteAllAuthors();
    await loadBoardGames.deleteAllBoardGames();
    console.log("✅ Todos los datos han sido eliminados correctamente.");
  } catch (error) {
    console.error("❌ Error en la eliminación de datos:", error);
  } finally {
    try {
      const driver = await getNeo4jDriver();
      await driver.close();
    } catch (closeError) {
      console.error("❌ Error al cerrar el driver de Neo4j:", closeError);
    }
  }
};

loadData();
