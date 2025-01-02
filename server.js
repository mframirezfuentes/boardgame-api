const express = require("express");
const app = express();
const connectToDB = require("./src/config/mongodb");
const users = require("./src/routes/users");
const boardgame = require("./src/routes/boardgame");
const location = require("./src/routes/location");
const author= require("./src/routes/author");

const port = process.env.PORT || 3000;

connectToDB();
app.use(express.json()); //analiza solicitudes en formato json
app.use("/api/v1", users);
app.use("/api/v1", boardgame);
app.use("/api/v1", location);
app.use("/api/v1", author);

app.listen(port, () => {
  console.log(`listening port ${port}`);
});
