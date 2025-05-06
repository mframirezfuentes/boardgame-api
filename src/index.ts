import express from "express";
import { connectToDB } from "./config/mongodb";
const app = express();

import users from "./routes/users";
import boardgame from "./routes/boardgame";
import locationRoute from "./routes/location";
import author from "./routes/author";
import login from "./routes/login";
import register from "./routes/resgister";
import cors from "cors";
import dotenv from "dotenv";

const port = process.env.PORT || 3000;

connectToDB();
app.use(express.json()); //analiza solicitudes en formato json
app.use(cors()); // permite el acceso a la API desde cualquier origen
app.use(express.urlencoded({ extended: true })); //analiza solicitudes con datos codificados en url
dotenv.config(); // carga las variables de entorno
app.use("/api/v1", users);
app.use("/api/v1", boardgame);
app.use("/api/v1", locationRoute);
app.use("/api/v1", author);
app.use("/api/v1", register)

app.use("/", login);

app.listen(port, () => {
  console.log(`listening port ${port}`);
});
