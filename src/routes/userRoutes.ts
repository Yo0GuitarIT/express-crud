import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();
const controller = new userController();
router.get("/", controller.getUsers);
router.get("/:id", controller.getUser);
router.post("/", controller.CreateUser);
router.put("/:id", controller.upDateUser);
router.delete("/:id", controller.deleteUser);
export default router;
