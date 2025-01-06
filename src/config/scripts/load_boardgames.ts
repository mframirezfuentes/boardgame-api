import { runQuery } from "../neo4j";
import { v4 as uuidv4 } from "uuid";

const boardGames = [
  { id: uuidv4(), title: "Catan", year: 1995, author: "Klaus Teuber" },
  {
    id: uuidv4(),
    title: "Carcassonne",
    year: 2000,
    author: "Klaus-Jürgen Wrede",
  },
  { id: uuidv4(), title: "Pandemic", year: 2008, author: "Matt Leacock" },
  { id: uuidv4(), title: "Ticket to Ride", year: 2004, author: "Alan R. Moon" },
];

const loadBoardGames = async () => {
  try {
    for (const game of boardGames) {
      const query = `
      MERGE (a:Author {name: $author})
      MERGE (b:BoardGame {id: $id, title: $title, year: $year})
      MERGE (b)-[:CREATED_BY]->(a)
    `;
      await runQuery(query, {
        id: game.id,
        author: game.author,
        title: game.title,
        year: game.year,
      });
      console.log(
        `✅ Juego "${game.title}" cargado y relacionado con "${game.author}".`
      );
    }
    console.log("✅ Todos los juegos de mesa han sido cargados correctamente.");
  } catch (error) {
    console.error("❌ Error al cargar juegos de mesa:", error);
  }
};

const deleteAllBoardGames = async () => {
  try {
    const query = `
      MATCH (b:BoardGame)
      DETACH DELETE b
    `;
    await runQuery(query);
    console.log(
      "✅ Todos los juegos de mesa han sido eliminados correctamente."
    );
  } catch (error) {
    console.error("❌ Error al eliminar juegos de mesa:", error);
  }
};

export default { loadBoardGames, deleteAllBoardGames };
