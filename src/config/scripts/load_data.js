const { loadAuthors } = require("./load_authors");
const { loadBoardGames } = require("./load_boardgames");
const { getNeo4jDriver } = require("../neo4j");

const loadData = async () => {
  try {
    console.log("🚀 Iniciando carga de datos en Neo4j...");
    await loadAuthors();
    await loadBoardGames();
    console.log("✅ Todos los datos han sido cargados correctamente.");
  } catch (error) {
    console.error("❌ Error en la carga de datos:", error);
  } finally {
    const driver = await getNeo4jDriver();
    await driver.close();
  }
};

loadData();
