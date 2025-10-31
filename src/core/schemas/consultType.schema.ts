import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// ✅ Schema principal (para creación)
export const ConsultTypeSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  name: z.string(),
});

// ✅ Schema para actualización (PATCH)
export const ConsultTypeUpdateSchema = ConsultTypeSchema.partial().omit({
  id: true,
});

// ✅ Tipados automáticos
export type ConsultTypeDTO = z.infer<typeof ConsultTypeSchema>;
export type ConsultTypeUpdateDTO = z.infer<typeof ConsultTypeUpdateSchema>;
