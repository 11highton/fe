import { useState } from "react"
import HttpService from "./useHttp"
import { postRes, type Content } from "../schemas/post"

const usePost = (id: string) => {
    const http = new HttpService()

    const [title, setTitle] = useState("")
    const [idx, setIdx] = useState(1)
    const [total, setTotal] = useState(1)
    const [script, setScript] = useState<string[]>([])

    const getPost = async () => {
        const { data } = await http.get(`/posts/${id}`, postRes)
        if(data) {
            setTitle(data.title)
            setTotal(data.contents.length)
            setScript(data.contents.map((content: Content) => content.text))
        }
    }

    return {
        title,
        setTitle,
        idx,
        setIdx,
        total,
        setTotal,
        script,
        setScript
    }
}

export default usePost
