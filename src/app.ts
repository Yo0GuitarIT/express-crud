import express from "express";
import bodyParser from "body-parser";
import UserRoutes from "./routes/userRoutes";
import UserController from "./controllers/userController";
import { users, getNextUserId } from "./models/userModel";

class App {
  public app: express.Application;

  constructor(
    private userController: UserController = new UserController(
      users,
      getNextUserId
    )
  ) {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
  }

  private routes(): void {
    const userRoutes = new UserRoutes(this.userController);
    this.app.use("/users", userRoutes.router);
  }
}

export default new App().app;
