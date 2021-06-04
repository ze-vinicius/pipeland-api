import { createConnection, getConnectionOptions, Connection } from "typeorm";

export default async (
  name = "default",
  host = "database"
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      name,
      host,
      database:
        process.env.NODE_ENV === "test"
          ? "pipeland_tests"
          : (defaultOptions.database as string),
    })
  );
};
