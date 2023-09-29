import express from "express";
import { getUsers } from "../controllers/user-controller";

export const router = express.Router();

router.get("/", getUsers)
