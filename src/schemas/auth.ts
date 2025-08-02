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
