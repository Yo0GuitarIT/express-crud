import { Request, Response } from "express";
import { User, users, getNextUserId } from "../models/userModel";

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

  public CreateUser(req: Request, res: Response): void {
    const newUser: User = {
      id: getNextUserId(),
      name: req.body.name,
      email: req.body.email,
    };

    users.push(newUser);
    res.status(201).json(newUser);
  }

  public upDateUser(req: Request, res: Response): void {
    const user = users.find((user) => user.id === parseInt(req.params.id));
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  }
  public deleteUser(req: Request, res: Response): void {
    const userIndex = users.findIndex(
      (user) => user.id === parseInt(req.params.id),
    );
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      res.json({ message: "User delete successfully." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  }
}

export default userController;
