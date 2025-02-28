import { z } from "zod";

const querySchema = z.object({
  limit: z.coerce.number().optional(),
  offset: z.coerce.number().optional(),
});

export default defineEventHandler(async (event) => {
  const queryData = await getValidatedQuery(event, (q) => querySchema.parse(q));

  const res = await getAllBlog(queryData.limit, queryData.offset);

  const data = res?.map((item) => {
    return {
      id: item.id,
      title: item.title,
      img: item.img,
      data: item.data,
      description: item.description,
    };
  });

  return data;
});
