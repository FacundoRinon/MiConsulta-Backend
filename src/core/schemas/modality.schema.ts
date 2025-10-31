import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// ✅ Schema principal (para creación)
export const ModalitySchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  name: z.string(),
});

// ✅ Schema para actualización (PATCH)
export const ModalityUpdateSchema = ModalitySchema.partial().omit({
  id: true,
});

// ✅ Tipados automáticos
export type ModalityDTO = z.infer<typeof ModalitySchema>;
export type ModalityUpdateDTO = z.infer<typeof ModalityUpdateSchema>;
