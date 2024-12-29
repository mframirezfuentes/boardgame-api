const { runQuery } = require("../neo4j");

const boardGames = [
  { title: "Catan", year: 1995, author: "Klaus Teuber" },
  { title: "Carcassonne", year: 2000, author: "Klaus-Jürgen Wrede" },
  { title: "Pandemic", year: 2008, author: "Matt Leacock" },
  { title: "Ticket to Ride", year: 2004, author: "Alan R. Moon" },
];

const loadBoardGames = async () => {
  try {
    for (const game of boardGames) {
      const query = `
        MERGE (a:Author {name: $author})
        MERGE (b:BoardGame {title: $title, year: $year})
        MERGE (b)-[:CREATED_BY]->(a)
      `;
      await runQuery(query, {
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

module.exports = { loadBoardGames };
