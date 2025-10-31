import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// ✅ Schema principal (para creación)
export const ProfessionSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  name: z.string(),
});

// ✅ Schema para actualización (PATCH)
export const ProfessionUpdateSchema = ProfessionSchema.partial().omit({
  id: true,
});

// ✅ Tipados automáticos
export type ProfessionDTO = z.infer<typeof ProfessionSchema>;
export type ProfessionUpdateDTO = z.infer<typeof ProfessionUpdateSchema>;
