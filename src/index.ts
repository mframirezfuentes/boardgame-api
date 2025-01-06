import express from "express";
import { connectToDB } from "./config/mongodb";
const app = express();

import users from "./routes/users";
import boardgame from "./routes/boardgame";
import locationRoute from "./routes/location";
import author from "./routes/author";
import login from "./routes/login";

const port = process.env.PORT || 3000;

connectToDB();
app.use(express.json()); //analiza solicitudes en formato json
app.use("/api/v1", users);
app.use("/api/v1", boardgame);
app.use("/api/v1", locationRoute);
app.use("/api/v1", author);

app.use("/", login);

app.listen(port, () => {
  console.log(`listening port ${port}`);
});
