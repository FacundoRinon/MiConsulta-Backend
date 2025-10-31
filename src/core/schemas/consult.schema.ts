import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// Transformador para convertir strings de fecha a objetos Date
// const dateFromString = z.preprocess((val) => {
//   if (typeof val === "string") {
//     const d = new Date(val);
//     return isNaN(d.getTime()) ? undefined : d;
//   }
//   if (val instanceof Date) return val;
//   return undefined;
// }, z.date());

// ✅ Schema principal (para creación)
export const ConsultSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  user_id: z.string(),
  professional_id: z.string(),
  availability_id: z.string(),
  session_date: z.date(),
  init_hour: z.date(),
  end_hour: z.date(),
  type_id: z.string(),
  recurrence_pattern_id: z.string(),
  recurrence_group_id: z.string(),
  created_at: z.date().default(() => new Date()),
  location: z.string(),
  modality_id: z.string(),
});

// ✅ Schema para actualización (PATCH)
export const ConsultUpdateSchema = ConsultSchema.partial().omit({
  id: true,
  created_at: true,
});

// ✅ Tipados automáticos
export type ConsultDTO = z.infer<typeof ConsultSchema>;
export type ConsultUpdateDTO = z.infer<typeof ConsultUpdateSchema>;
