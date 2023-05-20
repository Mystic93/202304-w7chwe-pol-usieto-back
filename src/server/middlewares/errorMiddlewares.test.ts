import { type Request, type Response, type NextFunction } from "express";
import CustomError from "../../CustomError/CustomError.js";
import { generalError, notFoundError } from "./errorMiddlewares.js";

type CustomResponse = Pick<Response, "status" | "json">;

const response: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const request = {};
const next = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a notFoundError function", () => {
  describe("When it receives a next function", () => {
    test("Then it should call it with the custom error with status code 404 and message 'Sorry endpoint not found'", () => {
      const customError = new CustomError(404, "Sorry endpoint not found");

      notFoundError(
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given a generalError function", () => {
  describe("When called with and an unknown error", () => {
    test("Then it should call response with code 500 and json with 'General error try again soon'", () => {
      const error = new Error("General error try again soon");
      const statusCode = 500;
      const { message } = error;
      generalError(
        error as CustomError,
        request as Request,
        response as Response,
        next as NextFunction
      );

      expect(response.status).toHaveBeenCalledWith(statusCode);
      expect(response.json).toHaveBeenCalledWith({ message });
    });
  });
});
