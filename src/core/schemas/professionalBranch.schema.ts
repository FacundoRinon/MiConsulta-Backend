import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

// ✅ Schema principal (para creación)
export const ProfessionalBranchSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidv4()),
  professional_id: z.string(),
  branch_id: z.string(),
});

// ✅ Schema para actualización (PATCH)
export const ProfessionalBranchUpdateSchema =
  ProfessionalBranchSchema.partial().omit({
    id: true,
  });

// ✅ Tipados automáticos
export type ProfessionalBranchDTO = z.infer<typeof ProfessionalBranchSchema>;
export type ProfessionalBranchUpdateDTO = z.infer<
  typeof ProfessionalBranchUpdateSchema
>;
