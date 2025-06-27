import { z } from "zod";

export const criteriaSchema = z.object({
  minPrice: z.number(),
  maxPrice: z.number().optional(),
  location: z.string()
});
