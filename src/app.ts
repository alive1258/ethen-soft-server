import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/users/user.route";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

//application roter

app.use("/api/v1/users", UserRoutes);

const getAController = (req: Request, res: Response) => {
  res.send("Hello Ethen Soft!");
};

app.get("/", getAController);

export default app;
