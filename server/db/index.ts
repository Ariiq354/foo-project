import { drizzle } from "drizzle-orm/libsql";
import * as auth from "./schema/auth";
import * as blog from "./schema/blog";

const config = useRuntimeConfig();

export const db = drizzle({
  connection: {
    url: config.databaseUrl as string,
    authToken: config.databaseAuthToken as string,
  },
  schema: {
    ...auth,
    ...blog,
  },
  casing: "snake_case",
});
