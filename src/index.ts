import express from "express";
import { connectToDB } from "./config/mongodb";
const app = express();

import users from "./routes/users";
import boardgame from "./routes/boardgame";
//const locationRoute = require("./src/routes/location");
//const author= require("./src/routes/author");

const port = process.env.PORT || 3000;

connectToDB();
app.use(express.json()); //analiza solicitudes en formato json
app.use("/api/v1", users);
app.use("/api/v1", boardgame);
//app.use("/api/v1", locationRoute);
//app.use("/api/v1", author);

app.listen(port, () => {
  console.log(`listening port ${port}`);
});
