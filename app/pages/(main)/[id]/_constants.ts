import { z } from "zod";

export const schema = z.object({
  id: z.number().optional(),
  name: z.string(),
  noTelepon: z.string(),
  pesan: z.string(),
});

export const getInitialFormData = (): Partial<Schema> => ({
  id: undefined,
  name: undefined,
  noTelepon: undefined,
  pesan: undefined,
});

export type Schema = z.output<typeof schema>;
