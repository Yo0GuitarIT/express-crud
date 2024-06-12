import { Request, Response } from "express";
import UserController from "../src/controllers/userController";

describe("UserController", () => {
  let userController: UserController;
  let getNextUserIdMock: jest.Mock;

  beforeEach(() => {
    getNextUserIdMock = jest.fn().mockReturnValue(3);
    userController = new UserController(
      [
        { id: 1, name: "andy", email: "andy@test.com" },
        { id: 2, name: "leo", email: "leo@test.com" },
      ],
      getNextUserIdMock
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

  test("creatUser should return new user", () => {
    const req = {
      body: { name: "Tom", email: "tom@test.com" },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    userController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: 3,
      name: "Tom",
      email: "tom@test.com",
    });
  });

  test("updateUser shoud update and return the user", () => {
    const req = {
      params: { id: 1 },
      body: { name: "Andy Update", email: "andy.update@test.com" },
    } as unknown as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    userController.updateUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      id: 1,
      name: "Andy Update",
      email: "andy.update@test.com",
    });
  });

  test("updateUser shoud return 404 if user not found", () => {
    const req = {
      params: { id: 3 },
      body: { name: "Non-user Update", email: "nonExist.update@test.com" },
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    userController.updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "User not found.",
    });
  });

  test("deleteUser should delete the user and return a success message", () => {
    const req = { params: { id: 1 } } as unknown as Request;
    const res = { json: jest.fn() } as unknown as Response;

    userController.deleteUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "User delete successfully.",
    });
  });
  test("deleteUser should return 404 if user not found", () => {
    const req = { params: { id: 3 } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    userController.deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "User not found.",
    });
  });
});
