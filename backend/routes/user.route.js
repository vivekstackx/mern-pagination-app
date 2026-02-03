import express from "express";
import {
  createUser,
  getAllRecord,
  getUserCount,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users", getAllRecord);
router.get("/usercount", getUserCount);
router.post("/users", createUser);

export default router;
