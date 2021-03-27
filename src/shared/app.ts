import "reflect-metadata";
import express from "express";
import "./infra/database";
import "./container";

const app = express();

export { app };
