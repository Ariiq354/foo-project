export default defineEventHandler(async (event) => {
  protectFunction(event);

  const id = getRouterParam(event, "id");

  const res = await getBlogById(Number(id));

  return res;
});
