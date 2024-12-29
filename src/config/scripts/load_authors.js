const { runQuery } = require("../neo4j");

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
      `;
      await runQuery(query, { name: author.name });
      console.log(`✅ Autor "${author.name}" cargado en Neo4j.`);
    }
    console.log("✅ Todos los autores han sido cargados correctamente.");
  } catch (error) {
    console.error("❌ Error al cargar autores:", error);
  }
};

module.exports = { loadAuthors };
