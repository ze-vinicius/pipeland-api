import crypto from "crypto";
import multer from "multer";
import path from "path";

const serverFolder = path.resolve(__dirname, "..", "..");
const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export default {
  directoryAssets: path.resolve(serverFolder, "assets"),
  userPhotosDirectory: path.resolve(serverFolder, "tmp", "avatar"),
  directory: serverFolder,
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
