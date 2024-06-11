import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();
const controller = new userController();
router.get("/", controller.getUsers);
router.get("/:id", controller.getUser);

export default router;
