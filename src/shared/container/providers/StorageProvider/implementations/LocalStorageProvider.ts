import fs from "fs";
import path from "path";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(upload.tmpFolder, file),
      path.resolve(upload.tmpFolder, folder, file)
    );

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filename = path.resolve(upload.tmpFolder, folder, file);

    try {
      await fs.promises.stat(filename);
    } catch (error) {
      return;
    }

    fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
