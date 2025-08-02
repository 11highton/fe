import z from "zod";

export const replMsgRes = z.array(z.object({
    role: z.string(),
    content: z.string()
}))
