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
export const BranchSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),

  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(1, "La descripcion es obligatoria"),
  profession_id: z.string(),
});

// ✅ Schema para actualización (PATCH)
export const BranchUpdateSchema = BranchSchema.partial().omit({
  id: true,
});

// ✅ Tipados automáticos
export type BranchDTO = z.infer<typeof BranchSchema>;
export type BranchUpdateDTO = z.infer<typeof BranchUpdateSchema>;
