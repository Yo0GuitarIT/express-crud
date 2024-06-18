import { Router } from "express";
import TokenController from "../controllers/tokenController";

class TokenRoutes {
  public router: Router;

  constructor(private tokenController: TokenController) {
    this.router = Router();
    this.tokenRoutes();
  }
  private tokenRoutes(): void {
    this.router.post(
      "/",
      this.tokenController.getToken.bind(this.tokenController)
    );
  }
}

export default TokenRoutes;