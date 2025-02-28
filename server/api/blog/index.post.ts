import { z } from "zod";

const bodySchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  img: z.string(),
  data: z.string(),
  description: z.string(),
});

export default defineEventHandler(async (event) => {
  protectFunction(event);

  const res = await readValidatedBody(event, (body) => bodySchema.parse(body));

  if (res.id) {
    await updateBlog(res.id, res);
  } else {
    await createBlog(res);
  }

  return;
});
