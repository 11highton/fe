import { useState } from "react"
import HttpService from "./useHttp"
import { postRes, type Content } from "../schemas/post"

const usePost = (id: string) => {
    const http = new HttpService()
    const httpForAudio = new HttpService("/api", "audio/mpeg", 'blob')

    const [title, setTitle] = useState("")
    const [idx, setIdx] = useState(0)
    const [total, setTotal] = useState(0)
    const [script, setScript] = useState<Content[]>([])
    const [audio, setAudio] = useState<Blob>()
    const [timeline, setTimeline] = useState<number>(0)

    const getPost = async () => {
        const { data } = await http.get(`/posts/${id}`, postRes)
        if(data) {
            setTitle(data.title)
            setTotal(data.contents.length)
            setScript(data.contents)
        }
    }
    const getAudio = async () => {
        const res = await httpForAudio.get(`/audio/stream/${id}`)
        if(res) {
            setAudio(res as unknown as Blob)
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
        setScript,
        getPost,
        getAudio,
        audio,
        timeline,
        setTimeline
    }
}

export default usePost
