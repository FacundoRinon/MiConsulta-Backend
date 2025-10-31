import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// ✅ Schema principal (para creación)
export const AvailabilitySchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  professional_id: z.string(),
  day_of_week: z.number(),
  init_hour: z.date(),
  end_hour: z.date(),
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
