const express = require("express");
const app = express();
const connectToDB = require("./src/config/mongodb");
const users = require("./src/routes/users");

const port = process.env.PORT || 3000;

connectToDB();
app.use(express.json()); //analiza solicitudes en formato json
app.use("/api", users);

app.listen(port, () => {
  console.log(`listening port ${port}`);
});
