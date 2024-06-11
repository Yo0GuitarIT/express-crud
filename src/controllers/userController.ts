import { Request, Response } from "express";
import { User } from "../models/userModel";

class UserController {
  private users: User[];
  private getNextUserId: () => number;

  constructor(users: User[], getNextUserId: () => number) {
    this.users = users;
    this.getNextUserId = getNextUserId;
  }

  public getAllUsers(req: Request, res: Response): void {
    res.json(this.users);
  }

  public getUser(req: Request, res: Response): void {
    const userId = parseInt(req.params.id);
    const user = this.findUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  }

  public createUser(req: Request, res: Response): void {
    const newUser: User = {
      id: this.getNextUserId(),
      name: req.body.name,
      email: req.body.email,
    };

    this.users.push(newUser);
    res.status(201).json(newUser);
  }

  public updateUser(req: Request, res: Response): void {
    const userId = parseInt(req.params.id);
    const user = this.findUserById(userId);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  }
  public deleteUser(req: Request, res: Response): void {
    const userId = parseInt(req.params.id);
    const userIndex = this.users.findIndex((user) => user.id === userId);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      res.json({ message: "User delete successfully." });
    } else {
      res.status(404).json({ message: "User not found." });
    }
  }

  private findUserById(userId: number): User | undefined {
    return this.users.find((user) => user.id === userId);
  }
}

export default UserController;
