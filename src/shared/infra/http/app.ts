import "reflect-metadata";
import express from "express";

import createConnection from "../typeorm";
import "../../container";

createConnection();
const app = express();

export { app };
