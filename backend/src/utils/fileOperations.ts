import fs from "fs/promises";
import path from "path";

export class FileOperations {
  private static getFilePath(modelName: string): string {
    return path.resolve(__dirname, `../../src/data/${modelName}.json`);
  }

  public static async readFile<T>(modelName: string): Promise<T[]> {
    const filePath = this.getFilePath(modelName);

    try {
      const fileData = await fs.readFile(filePath, "utf8");
      return JSON.parse(fileData) as T[];
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  public static async saveFile<T>(modelName: string, data: T[]): Promise<void> {
    const filePath = this.getFilePath(modelName);

    try {
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    } catch (error) {
      throw error;
    }
  }
}