import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { Encryptor } from "../../frameworks/encryptor/bcrypt";

const encryptor = new Encryptor();

// Transformador para convertir strings de fecha a objetos Date
const dateFromString = z.preprocess((val) => {
  if (typeof val === "string") {
    const d = new Date(val);
    return isNaN(d.getTime()) ? undefined : d;
  }
  if (val instanceof Date) return val;
  return undefined;
}, z.date());

// ✅ Schema base
const BaseUserSchema = z.object({
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
  birth_date: dateFromString,
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  phone: z.string().min(6).max(20).optional().default(""),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

// ✅ Transformación: hashea la contraseña antes de devolver el objeto
export const UserSchema = BaseUserSchema.transform(async (data) => {
  const hashedPassword = await encryptor.encrypt(data.password);
  return {
    ...data,
    password: hashedPassword,
  };
});

// ✅ Schema para actualización (no toca la contraseña si no se manda)
export const UserUpdateSchema = BaseUserSchema.partial().extend({
  updated_at: z.date().default(() => new Date()),
});

// ✅ Tipados automáticos
export type UserDTO = z.infer<typeof BaseUserSchema>;
export type UserUpdateDTO = z.infer<typeof UserUpdateSchema>;
