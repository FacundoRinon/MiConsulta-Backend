import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// ✅ Schema principal (para creación)
export const LocationsSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  professional_id: z.string(),
  modality_id: z.string(),
  address_or_link: z.string(),
});

// ✅ Schema para actualización (PATCH)
export const LocationsUpdateSchema = LocationsSchema.partial().omit({
  id: true,
});

// ✅ Tipados automáticos
export type LocationsDTO = z.infer<typeof LocationsSchema>;
export type LocationsUpdateDTO = z.infer<typeof LocationsUpdateSchema>;
