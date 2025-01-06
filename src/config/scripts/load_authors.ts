import { runQuery } from "../neo4j";
import { v4 as uuidv4 } from "uuid";

const authors = [
  { name: "Klaus Teuber" },
  { name: "Klaus-Jürgen Wrede" },
  { name: "Matt Leacock" },
  { name: "Alan R. Moon" },
];

const loadAuthors = async () => {
  try {
    for (const author of authors) {
      const query = `
      MERGE (a:Author {name: $name})
      SET a.id = $id
    `;
      await runQuery(query, { name: author.name, id: uuidv4() });
      console.log(`✅ Autor "${author.name}" cargado en Neo4j.`);
    }
    console.log("✅ Todos los autores han sido cargados correctamente.");
  } catch (error) {
    console.error("❌ Error al cargar autores:", error);
  }
};

const deleteAllAuthors = async () => {
  try {
    const query = `
      MATCH (a:Author)
      DETACH DELETE a
    `;
    await runQuery(query);
    console.log("✅ Todos los autores han sido eliminados correctamente.");
  } catch (error) {
    console.error("❌ Error al eliminar los autores de juegos de mesa:", error);
  }
};

export default { loadAuthors, deleteAllAuthors };
