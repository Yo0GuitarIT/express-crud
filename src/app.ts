import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
  }

  private routes(): void {
    this.app.use("/users", userRoutes);
  }
}

export default new App().app;
