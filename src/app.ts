import express from "express";
import bodyParser from "body-parser";
import UserRoutes from "./routes/userRoutes";
import UserController from "./controllers/userController";
import TokenRoutes from "./routes/tokenRoutes";
import TokenController from "./controllers/tokenController";
import { users, getNextUserId } from "./models/userModel";

class App {
  public app: express.Application;

  constructor(
    private userController: UserController = new UserController(
      users,
      getNextUserId
    ),
    private tokenController: TokenController = new TokenController()
  ) {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private routes(): void {
    const userRoutes = new UserRoutes(this.userController);
    this.app.use("/users", userRoutes.router);

    const tokenRoutes = new TokenRoutes(this.tokenController);
    this.app.use("/token", tokenRoutes.router);
  }
}

export default new App().app;
