import type { InferInsertModel } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamp } from "./common";

export const blogTable = sqliteTable("blog", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  img: text().notNull(),
  data: text().notNull(),
  description: text().notNull(),
  ...timestamp,
});

export const commentTable = sqliteTable("comment", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  noTelepon: text().notNull(),
  pesan: text().notNull(),
  ...timestamp,
});

export type NewBlog = InferInsertModel<typeof blogTable>;
export type NewComment = InferInsertModel<typeof commentTable>;
