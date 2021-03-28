import "reflect-metadata";
import express from "express";

import createConnection from "../database";
import "../../container";

createConnection();
const app = express();

export { app };
