import express, {Request, Response} from "express";
import router from "./routes"

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

app.use("/api", router);
