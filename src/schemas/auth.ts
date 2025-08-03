import z from "zod";

export const user = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
    roles: z.array(z.string())
})

export const loginRes = z.object({
    user: user,
    accessToken: z.string(),
    refreshToken: z.string()
})

export const meRes = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    roles: z.array(z.string()),
    iat: z.number(),
    exp: z.number()
})

export type Me = z.infer<typeof meRes>
