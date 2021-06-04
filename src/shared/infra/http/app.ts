import "reflect-metadata";
import express from "express";
import "dotenv/config";

import uploadConfig from "@config/upload";

import createConnection from "../typeorm";
import "../../container";

createConnection();
const app = express();

app.use(express.json());

app.use("/files", express.static(uploadConfig.directory));

export { app };
