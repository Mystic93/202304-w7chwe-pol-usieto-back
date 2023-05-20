import { type Request } from "express";

export interface UserCredentials {
  username: string;
  password: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export interface UserStructure extends UserCredentials {
  _id: string;
  name: string;
  image: string;
  friends: string[];
  enemies: string[];
}
