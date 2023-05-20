import { type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { type UserStructure, type UserCredentialsRequest } from "../../types";
import { loginUser } from "./userController.js";
import { Types } from "mongoose";
import User from "../../../database/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<UserCredentialsRequest> = {
  body: {
    username: "pol",
    password: "pol",
  },
};

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

const token = "tokensito";

describe("Given a loginUser controller", () => {
  describe("When it receives a request with valid crentials and a response", () => {
    test("Then it should cal the response's method status with 200", async () => {
      const mockUser: Partial<UserStructure> = {
        _id: new Types.ObjectId().toString(),
        name: "",
        username: "pol",
        password: "pol",
        image: "",
        friends: [],
        enemies: [],
      };

      const expectedStatusCode = 200;

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      });

      bcrypt.compare = jest.fn().mockReturnValue(true);

      jwt.sign = jest.fn().mockReturnValue(token);

      await loginUser(req as UserCredentialsRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with tha token", async () => {
      await loginUser(req as UserCredentialsRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request with a wrong password and a next function", () => {
    test("Then it should call the next function with 401 and 'Wrong credential'", async () => {
      const expectedError = new CustomError(401, "Wrong credential");

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(req as UserCredentialsRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
