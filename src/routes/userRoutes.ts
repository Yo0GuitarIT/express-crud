import { Router } from "express";
import UserController from "../controllers/userController";

class UserRoutes {
  public router: Router;

  constructor(private userController: UserController) {
    this.router = Router(); 
    this.intializeRoutes();
  }

  private intializeRoutes() {
    this.router.get(
      "/",
      this.userController.getAllUsers.bind(this.userController)
    );
    this.router.get(
      "/:id",
      this.userController.getUser.bind(this.userController)
    );
    this.router.post(
      "/",
      this.userController.createUser.bind(this.userController)
    );
    this.router.put(
      "/:id",
      this.userController.updateUser.bind(this.userController)
    );
    this.router.delete(
      "/:id",
      this.userController.deleteUser.bind(this.userController)
    );
  }
}
export default UserRoutes;
