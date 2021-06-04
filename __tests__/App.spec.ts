import request from "supertest";
import { Connection, getConnection } from "typeorm";

import { app } from "../src/shared/infra/http/app";
import createConnection from "../src/shared/infra/typeorm";

let connection: Connection;

describe("App", () => {
  beforeAll(async () => {
    connection = await createConnection("test-connection");

    await connection.query("DROP TABLE IF EXISTS users");

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query("DELETE FROM users");
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  describe("Users", () => {
    it("should be able to create a new user", async () => {
      const response = await request(app).post("users").send({
        name: "José Vinícius",
        email: "josevsaraiva@gmail.com",
        company: "Petrobras",
        phone: "94981765115",
        password: "1234",
      });

      expect(response.body).toEqual(
        expect.objectContaining({
          name: "José Vinícius",
          email: "josevsaraiva@gmail.com",
          company: "Petrobras",
          phone: "94981765115",
        })
      );
    });

    it("should be able to create a new user with rights 1", async () => {
      const response = await request(app).post("users").send({
        name: "José Vinícius",
        email: "josevsaraiva@gmail.com",
        password: "1234",
        role: "TEACHER",
      });

      expect(response.body).toEqual(
        expect.objectContaining({
          name: "José Vinícius",
          email: "josevsaraiva@gmail.com",
          password: "1234",
          role: "TEACHER",
        })
      );
    });

    it("should be able to authenticate a user", async () => {
      await request(app).post("users").send({
        name: "José Vinícius",
        email: "josevsaraiva@gmail.com",
        password: "1234",
        role: "TEACHER",
      });

      const response = await request(app).post("sessions").send({
        email: "josevsaraiva@gmail.com",
        password: "1234",
      });

      expect(response.body).toHaveProperty("token");
    });
  });
});
