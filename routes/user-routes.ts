import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  uploadImage,
} from "../controllers/user-controller";

export const router = express.Router();

router.get("/", getUsers);
router.post("/create-user", createUser);
router.put("/", updateUser);
router.delete("/user/:id", deleteUser);
router.post("/:id/image", uploadImage);
