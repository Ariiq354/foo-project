import { z } from "zod";

export const schema = z.object({
  id: z.number().optional(),
  title: z.string(),
  img: z.string(),
  data: z.string(),
});

export const getInitialFormData = (): Partial<Schema> => ({
  id: undefined,
  title: undefined,
  img: undefined,
  data: undefined,
});

export type Schema = z.output<typeof schema>;
