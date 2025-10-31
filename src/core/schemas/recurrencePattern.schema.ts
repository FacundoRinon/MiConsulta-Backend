import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// ✅ Schema principal (para creación)
export const RecurrencePatternSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  name: z.string(),
});

// ✅ Schema para actualización (PATCH)
export const RecurrencePatternUpdateSchema =
  RecurrencePatternSchema.partial().omit({
    id: true,
  });

// ✅ Tipados automáticos
export type RecurrencePatternDTO = z.infer<typeof RecurrencePatternSchema>;
export type RecurrencePatternUpdateDTO = z.infer<
  typeof RecurrencePatternUpdateSchema
>;
