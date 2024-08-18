import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

//application router

app.use("/api/v1", router);

const getAController = (req: Request, res: Response) => {
  res.send("Hello Ethen Soft!");
};

app.get("/", getAController);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
