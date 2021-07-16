import "reflect-metadata";
import cors from "cors";
import express from "express";
import "dotenv/config";

import uploadConfig from "@config/upload";

import createConnection from "../typeorm";
import "../../container";

createConnection();
const app = express();
app.use(cors());

app.use(express.json());

app.use("/assets", express.static(uploadConfig.directoryAssets));
app.use("/avatar", express.static(`${uploadConfig.tmpFolder}/avatar`));

export { app };
