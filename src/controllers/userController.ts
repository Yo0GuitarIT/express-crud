import { Request, Response } from "express";
import { User, users } from "../models/userModel";

class userController {
  public getUsers(req: Request, res: Response): void {
    res.json(users);
  }

  public getUser(req: Request, res: Response): void {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  }
}

export default userController;
