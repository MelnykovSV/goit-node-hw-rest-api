import { File } from "buffer";
import * as express from "express";
import { Schema } from "mongoose";
import QueryString from "qs";
// const { Schema } = require("mongoose");

export interface IError extends Error {
  message: string;
  status?: number;
}

export interface IContact {
  _id: Schema.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  owner: Schema.Types.ObjectId;
}

export interface IUser {
  _id: Schema.Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  subscription: "starter" | "pro" | "business";
  token: string;
  avatarURL: string;
}

export interface IExtendedRequest extends express.Request {
  user: IUser;
}

export interface ISearchQueryBody {
  owner: Schema.Types.ObjectId;
  favorite?:
    | string
    | QueryString.ParsedQs
    | string[]
    | QueryString.ParsedQs[]
    | null;
}

export interface ISearchQuery {
  page: number;
  limit: number;
  favorite: null | boolean;
}

export interface IVerifyEmail {
  to: string;
  subject: string;
  html: string;
}

export type IFileNameCallback = (error: Error | null, filename: string) => void;

export type Ctrl = (req: express.Request, res: express.Response) => void;
