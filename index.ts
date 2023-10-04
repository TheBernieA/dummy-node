import express, { NextFunction, Request, Response } from "express";
import { router as userRoute } from "./routes/user-routes";

import { HttpError } from "./models/http-error";
import multer, { FileFilterCallback } from "multer";
import { randomUUID } from "crypto";

//MVC MODEL VIEW CONTROLLER

const app = express();

app.use(express.json());

const fileStorage = multer.diskStorage({
  destination: (req: Request, file, cb: any) => {
    cb(null, "images");
  },
  filename: (req: Request, file, cb: any) => {
    cb(null, `${randomUUID()}-${file.originalname}`);
  },
});

const fileFilter = (req: Request, file: any, cb: FileFilterCallback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/users", userRoute);

const port = 3000;

app.listen(port, () => {
  console.log("server running on port", port);
});
