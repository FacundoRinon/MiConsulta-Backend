import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const dateFromString = z.preprocess((val) => {
  if (typeof val === "string") {
    const d = new Date(val);
    return isNaN(d.getTime()) ? undefined : d;
  }
  if (val instanceof Date) return val;
  return undefined;
}, z.date());

// ✅ Schema principal (para creación)
export const AvailabilitySchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  professional_id: z.string(),
  day_of_week: z.number(),
  init_hour: dateFromString,
  end_hour: dateFromString,
  modality_id: z.string(),
  state_id: z.string(),
});

// ✅ Schema para actualización (PATCH)
export const AvailabilityUpdateSchema = AvailabilitySchema.partial().omit({
  id: true,
});

// ✅ Tipados automáticos
export type AvailabilityDTO = z.infer<typeof AvailabilitySchema>;
export type UserUpdateDTO = z.infer<typeof AvailabilityUpdateSchema>;
