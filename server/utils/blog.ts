import { desc, eq, inArray } from "drizzle-orm";
import { db } from "~~/server/db";
import { type NewBlog, blogTable } from "~~/server/db/schema/blog";

export async function getAllBlog(limit = 5, offset = 0) {
  return await db.query.blogTable.findMany({
    orderBy: desc(blogTable.createdAt),
    limit,
    offset,
  });
}

export async function getBlogById(id: number) {
  return await db.query.blogTable.findFirst({
    where: eq(blogTable.id, id),
  });
}

export async function createBlog(data: NewBlog) {
  return await db.insert(blogTable).values(data);
}

export async function updateBlog(id: number, data: Partial<NewBlog>) {
  return await db.update(blogTable).set(data).where(eq(blogTable.id, id));
}

export async function deleteBlog(id: number[]) {
  return await db.delete(blogTable).where(inArray(blogTable.id, id));
}
