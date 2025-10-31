import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// ✅ Schema principal (para creación)
export const CountrySchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  name: z.string(),
});

// ✅ Schema para actualización (PATCH)
export const CountryUpdateSchema = CountrySchema.partial().omit({
  id: true,
});

// ✅ Tipados automáticos
export type CountryDTO = z.infer<typeof CountrySchema>;
export type CountryUpdateDTO = z.infer<typeof CountryUpdateSchema>;
