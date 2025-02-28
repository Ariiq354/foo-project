import { desc, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/db";
import { type NewComment, commentTable } from "~~/server/db/schema/blog";

export async function getAllComment(limit = 5, offset = 0) {
  return await db.query.commentTable.findMany({
    orderBy: desc(commentTable.createdAt),
    limit,
    offset,
  });
}
export async function createComment(data: NewComment) {
  return await db.insert(commentTable).values(data);
}

export async function updateComment(id: number, data: Partial<NewComment>) {
  return await db.update(commentTable).set(data).where(eq(commentTable.id, id));
}

export async function deleteComment(id: number[]) {
  return await db.delete(commentTable).where(inArray(commentTable.id, id));
}
