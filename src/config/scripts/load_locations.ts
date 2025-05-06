import location from "../../models/location";

const loadLocations = async () => {
  const locations = [
    ["House", "123 Main St, Cityville"],
    ["Park", "456 Elm St, Townsville"],
    ["Cafe", "789 Oak St, Villageburg"],
    ["Library", "101 Maple St, Hamletton"],
    ["Game Store", "202 Birch St, Metropolis"],
  ];

  console.log("🚀 Iniciando carga de datos de ubicaciones en Neo4j...");
  for (const [name, address] of locations) {
    try {
      await location.createLocation(name, address);
      console.log(`✅ Ubicación '${name}' creada.`);
    } catch (error) {
      console.error(`❌ Error al crear la ubicación '${name}':`, error);
    }
  }
  console.log("🚀 Carga de datos de ubicaciones en Neo4j completada.");

  console.log("✅ Todas las ubicaciones han sido cargadas correctamente.");
};

export default { loadLocations };
