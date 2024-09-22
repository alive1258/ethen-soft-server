import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";

const app: Application = express();

// parsers
<<<<<<< HEAD
app.use(cors());
=======


// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(cors());


>>>>>>> 497408e855328b941e4c6fad4b41d6cc3c5e1047
// cookie parser for grave cookie
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application router

app.use("/api/v1", router);

const getAController = (req: Request, res: Response) => {
  res.send("Hello Ethen Soft!");
};

app.get("/", getAController);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
