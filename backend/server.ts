import express, { Request, Response } from "express";
import router from "./routes";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

app.use("/api", router);
