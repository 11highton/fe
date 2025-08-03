import z from "zod";
import { user } from "./auth";

export const audioStream = z.instanceof(Blob)

export const Category = z.object({
    id: z.string(),
    name: z.string()
})

export const Content = z.object({
    id: z.string(),
    text: z.string(),
    timeline: z.number(),
    postId: z.string()
})

export const postRes = z.object({
    id: z.string(),
    title: z.string(),
    contents: z.array(Content),
    audio: z.string(),
    likes: z.number(),
    views: z.number(),
    author: user,
    authorId: z.string(),
    categories: z.array(Category),
    createdAt: z.string(),
})

export type Content = z.infer<typeof Content>
export type Post = z.infer<typeof postRes>
