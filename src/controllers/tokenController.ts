import { Request, Response } from "express";

class TokenController {
  public getToken(req: Request, res: Response): void {
    const authorizationCode = req.body.code;
    const accessToken = "success-fake-token";
    authorizationCode === "abc123"
      ? res.json({ access_token: accessToken })
      : res.status(400).json({ error: "Authorization code not provided." });
  }
}

export default TokenController;