import loadAuthors from "./load_authors";
import loadBoardGames from "./load_boardgames";
import loadLocations from "./load_locations";
import getNeo4jDriver from "../neo4j";

const loadData = async (): Promise<void> => {
  try {
    console.log("🚀 Iniciando carga de datos en Neo4j...");
    await loadAuthors.loadAuthors();
    await loadBoardGames.loadBoardGames();
    await loadLocations.loadLocations();
    console.log("✅ Todos los datos han sido cargados correctamente.");
  } catch (error) {
    console.error("❌ Error en la carga de datos:", error);
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
