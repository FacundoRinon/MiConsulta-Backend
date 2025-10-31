import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// ✅ Schema principal (para creación)
export const RecurrenceGroupSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  name: z.string(),
});

// ✅ Schema para actualización (PATCH)
export const RecurrenceGroupUpdateSchema = RecurrenceGroupSchema.partial().omit(
  {
    id: true,
  }
);

// ✅ Tipados automáticos
export type RecurrenceGroupDTO = z.infer<typeof RecurrenceGroupSchema>;
export type RecurrenceGroupUpdateDTO = z.infer<
  typeof RecurrenceGroupUpdateSchema
>;
