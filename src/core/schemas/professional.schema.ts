import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// Transformador para convertir strings de fecha a objetos Date
const dateFromString = z.preprocess((val) => {
  if (typeof val === "string") {
    const d = new Date(val);
    return isNaN(d.getTime()) ? undefined : d;
  }
  if (val instanceof Date) return val;
  return undefined;
}, z.date());

// ✅ Schema principal (para creación)
export const ProfessionalSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),

  first_name: z.string().min(1, "El nombre es obligatorio"),
  last_name: z.string().min(1, "El apellido es obligatorio"),
  birth_date: dateFromString,
  profession_id: z.string(),
  country_id: z.string(),
  location: z.string().optional().default(""),
  img: z.string().optional().default(""),
  description: z.string(),
  state_id: z.string(),
  price: z.number(),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
  email: z.string().email("Debe ser un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  document_type_id: z.string(),
  document_number: z.string(),
  phone: z
    .string()
    .min(6, "Número demasiado corto")
    .max(20, "Número demasiado largo")
    .optional()
    .default(""),
});

// ✅ Schema para actualización (PATCH)
export const ProfessionalUpdateSchema = ProfessionalSchema.partial()
  .omit({
    id: true,
    created_at: true,
    password: true,
  })
  .extend({
    updated_at: z.date().default(() => new Date()),
  });

// ✅ Tipados automáticos
export type ProfessionalDTO = z.infer<typeof ProfessionalSchema>;
export type ProfessionalUpdateDTO = z.infer<typeof ProfessionalUpdateSchema>;
