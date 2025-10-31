import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// ✅ Schema principal (para creación)
export const StateSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  name: z.string(),
});

// ✅ Schema para actualización (PATCH)
export const StateUpdateSchema = StateSchema.partial().omit({
  id: true,
});

// ✅ Tipados automáticos
export type StateDTO = z.infer<typeof StateSchema>;
export type StateUpdateDTO = z.infer<typeof StateUpdateSchema>;
