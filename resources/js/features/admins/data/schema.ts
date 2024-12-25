import { z } from 'zod';

const adminStatusSchema = z.union([
    z.literal('active'),
    z.literal('inactive'),
    z.literal('invited'),
    z.literal('suspended'),
]);
export type AdminStatus = z.infer<typeof adminStatusSchema>;

const adminRoleSchema = z.union([
    z.literal('superadmin'),
    z.literal('admin'),
    z.literal('cashier'),
    z.literal('manager'),
]);
export type AdminRole = z.infer<typeof adminRoleSchema>;

const adminSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    password_confirmation: z.string(),

    // status: adminStatusSchema,
    // role: adminRoleSchema,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});
export type Admin = z.infer<typeof adminSchema>;

export const adminListSchema = z.array(adminSchema);
