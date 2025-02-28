import { z } from "zod";

const bodySchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  noTelepon: z.string(),
  pesan: z.string(),
});

export default defineEventHandler(async (event) => {
  const res = await readValidatedBody(event, (body) => bodySchema.parse(body));

  if (res.id) {
    await updateComment(res.id, res);
  } else {
    await createComment(res);
  }

  return;
});
