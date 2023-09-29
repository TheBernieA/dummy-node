import express, { NextFunction, Request, Response } from "express";
import { router as usersRouter } from "./routes/user-routes";

const app = express();
app.use(express.json());

app.use((req, res: Response, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/users", usersRouter);

app.listen(3000, () => console.log("server on"));
