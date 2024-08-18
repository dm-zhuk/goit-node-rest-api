import { jest } from "@jest/globals";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import * as authServices from "../services/authServices.js";
import { login } from "../controllers/authControllers.js";

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const mockReq = (overrides = {}) => ({
  body: {
    email: "test@example.com",
    password: "password",
    ...overrides,
  },
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("login controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(authServices, "findUser").mockResolvedValue(null);
    jest.spyOn(authServices, "updateUser").mockResolvedValue(null);
    jest.spyOn(authServices, "register").mockResolvedValue(null);
  });

  it("should return token and user data on successful login", async () => {
    const req = mockReq();
    const res = mockRes();
    const mockUser = {
      id: 1,
      email: "test@example.com",
      password: "$2a$10$Sth3J.1d7h1zDqzk2vAm6e3kWtxrJH5bSD1ezZX9vC4FuXpUwOM0S",
      subscription: "starter",
    };

    authServices.findUser.mockResolvedValueOnce(mockUser);
    bcryptjs.compare.mockResolvedValueOnce(true);
    jwt.sign.mockReturnValueOnce("mocked.token.jwt");

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: "mocked.token.jwt",
      user: {
        email: "test@example.com",
        subscription: "starter",
      },
    });
  });

  it("should return 401 when email is wrong", async () => {
    const req = mockReq({ email: "nonexistent@example.com" });
    const res = mockRes();

    authServices.findUser.mockResolvedValueOnce(null);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Email is wrong" });
  });

  it("should return 401 when password is wrong", async () => {
    const req = mockReq({ password: "wrongpassword" });
    const res = mockRes();
    const mockUser = {
      id: 1,
      email: "test@example.com",
      password: "$2a$10$Sth3J.1d7h1zDqzk2vAm6e3kWtxrJH5bSD1ezZX9vC4FuXpUwOM0S",
      subscription: "starter",
    };

    authServices.findUser.mockResolvedValueOnce(mockUser);
    bcryptjs.compare.mockResolvedValueOnce(false);

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Password is wrong" });
  });
});
