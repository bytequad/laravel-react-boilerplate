import { z } from 'zod';

const userStatusSchema = z.union([
    z.literal('active'),
    z.literal('inactive'),
    z.literal('invited'),
    z.literal('suspended'),
]);
export type UserStatus = z.infer<typeof userStatusSchema>;

const userRoleSchema = z.union([
    z.literal('superadmin'),
    z.literal('admin'),
    z.literal('cashier'),
    z.literal('manager'),
]);
export type UserRole = z.infer<typeof userRoleSchema>;

const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    password_confirmation: z.string(),

    // status: userStatusSchema,
    // role: userRoleSchema,
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});
export type User = z.infer<typeof userSchema>;

export const userListSchema = z.array(userSchema);
