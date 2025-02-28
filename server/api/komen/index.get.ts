import { z } from "zod";

const querySchema = z.object({
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
});

export default defineEventHandler(async (event) => {
  protectFunction(event);

  const queryData = await getValidatedQuery(event, (q) => querySchema.parse(q));

  const res = await getAllComment(queryData.limit, queryData.offset);

  const data = res?.map((item) => {
    return {
      id: item.id,
      name: item.name,
      noTelepon: item.noTelepon,
      pesan: item.pesan,
    };
  });

  return data;
});
