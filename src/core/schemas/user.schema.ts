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

// ✅ Schema principal
export const UserSchema = z.object({
  // Se genera automáticamente al crear el usuario
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),

  first_name: z.string().min(1, "El nombre es obligatorio"),
  last_name: z.string().min(1, "El apellido es obligatorio"),
  email: z.string().email("Debe ser un email válido"),
  location: z.string().optional().default(""),
  img: z.string().optional().default(""),
  document_type_id: z.string(),
  document_number: z.string(),
  state_id: z.string(),
  country_id: z.string(),

  // Ingresada por el usuario
  birth_date: dateFromString,

  // Password: mínimo 6 caracteres (ajustá según tus políticas)
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),

  // Teléfono opcional pero validado mínimamente
  phone: z
    .string()
    .min(6, "Número demasiado corto")
    .max(20, "Número demasiado largo")
    .optional()
    .default(""),

  // Generados automáticamente
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

// ✅ Tipado automático
export type UserDTO = z.infer<typeof UserSchema>;
