import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// ✅ Schema principal (para creación)
export const DocumentTypeSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  name: z.string(),
});

// ✅ Schema para actualización (PATCH)
export const DocumentTypeUpdateSchema = DocumentTypeSchema.partial().omit({
  id: true,
});

// ✅ Tipados automáticos
export type DocumentTypeDTO = z.infer<typeof DocumentTypeSchema>;
export type DocumentTypeUpdateDTO = z.infer<typeof DocumentTypeUpdateSchema>;
