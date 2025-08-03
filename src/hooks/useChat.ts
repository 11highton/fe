import { useState } from "react"
import { replMsgRes } from "../schemas/repl"
import HttpService from "./useHttp"
import { postRes } from "../schemas/post"
import { useNavigate } from "react-router-dom"

const useChat = () => {
    const http = new HttpService()
    const navigate = useNavigate()

    const [message, setMessage] = useState("")
    const [response, setResponse] = useState("당신의 악몽을 들려주세요!")
    const [generating, setGenerating] = useState(false)
    const [loading, setLoading] = useState(false)

    const replStart = async () => {
        setLoading(true)
        await http.get("/repl/start")
        setLoading(false)
    }
    const replMsg = async () => {
        setLoading(true)
        const { data } = await http.post("/repl/message", {
            content: message
        }, replMsgRes)
        if(data) setResponse(data[data.length - 1].content)
        setLoading(false)
    }
    const replComplete = async() => {
        setLoading(true)
        const { data } = await http.get("/repl/complete", postRes)
        if(data) {
            navigate(`/post/${data.id}`)
        }
        setLoading(false)
    }
    const replCancel = async() => {
        setLoading(true)
        await http.get("/repl/cancel")
        setLoading(false)
    }

    return {
        message,
        setMessage,
        response,
        setResponse,
        generating,
        setGenerating,
        loading,
        setLoading,
        replStart,
        replMsg,
        replComplete,
        replCancel
    }
}

export default useChat
