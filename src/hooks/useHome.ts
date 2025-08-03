import { useEffect, useState } from "react";
import HttpService from "./useHttp";
import { postRes, type Post } from "../schemas/post";
import { meRes } from "../schemas/auth";
import type { Me } from "../schemas/auth";

const useHome = () => {
    const http = new HttpService()
    const [me, setMe] = useState<Me>()
    const [posts, setPosts] = useState<Post[]>([])

    const getMe = async () => {
        const { data } = await http.get("/me", meRes)
        if(data) setMe(data)
    }
    const getPosts = async () => {
        const { data } = await http.get(`/posts/user/${me?.id}`, postRes)
        if(data) setPosts(data)
    }

    useEffect(() => {
        getMe()
        getPosts()
    }, [])

    return {
        me,
        setMe,
        posts,
        setPosts,
    }
}

export default useHome
