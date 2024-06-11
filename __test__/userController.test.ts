import { Request, Response } from "express";
import UserController from "../src/controllers/userController";

describe("UserController", () => {
  let userController: UserController;

  beforeEach(() => {
    userController = new UserController(
      [
        { id: 1, name: "andy", email: "andy@test.com" },
        { id: 2, name: "leo", email: "leo@test.com" },
      ],
      jest.fn()
    );
  });

  test("getAllUsers should return all users", () => {
    const req = {} as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    userController.getAllUsers(req, res);

    expect(res.json).toHaveBeenCalledWith([
      { id: 1, name: "andy", email: "andy@test.com" },
      { id: 2, name: "leo", email: "leo@test.com" },
    ]);
  });

  test("getUser should return the correct user", () => {
    const req = { params: { id: "1" } } as unknown as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    userController.getUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      name: "andy",
      email: "andy@test.com",
    });
  });

  test("getUser should return 404 if user not found", () => {
    const req = { params: { id: "3" } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    userController.getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found." });
  });
});
