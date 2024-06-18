import express from "express";
import bodyParser from "body-parser";
import UserRoutes from "./routes/userRoutes";
import UserController from "./controllers/userController";
import { users, getNextUserId } from "./models/userModel";
import { Request, Response } from "express";

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
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private routes(): void {
    const userRoutes = new UserRoutes(this.userController);
    this.app.use("/users", userRoutes.router);
    
    this.app.post("/token", (req: Request, res: Response) => {
      const authorizationCode = req.body.code;
      const accessToken = "success-fake-access-token";
      if (authorizationCode === "abc123")
        return res.json({ access_token: accessToken });
      else
        return res
          .status(400)
          .json({ error: "Authorization code not provided." });
    });
  }
}

export default new App().app;
