import HttpService from "./useHttp";
import { postListRes, type Post } from "../schemas/post";
import { useState } from "react";

const useSearch = () => {
    const http = new HttpService()
    const [posts, setPosts] = useState<Post[]>([])
    const [query, setQuery] = useState("")

    const searchPosts = async () => {
        const { data } = await http.get(`/posts/search?q=${query}`, postListRes)
        if(data) setPosts(data)
    }

    return {
        posts,
        setPosts,
        query,
        setQuery,
        searchPosts,
    }
}

export default useSearch
