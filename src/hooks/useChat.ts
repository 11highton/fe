import { useState } from "react"
import { replMsgRes } from "../schemas/repl"
import HttpService from "./useHttp"

const useChat = () => {
    const http = new HttpService()

    const [message, setMessage] = useState("")
    const [response, setResponse] = useState("당신의 악몽을 들려주세요!")
    const [generating, setGenerating] = useState(false)

    const replStart = async () => {
        const res = await http.get("/repl/start")
    }
    const replMsg = async () => {
        const { data } = await http.post("/repl/message", {
            content: message
        }, replMsgRes)
        if(data) setResponse(data[data.length - 1].content)
    }
    const replComplete = async() => {
        const res = await http.get("/repl/complete")
    }
    const replCancel = async() => {
        const res = await http.get("/repl/cancel")
    }

    return {
        message,
        setMessage,
        response,
        setResponse,
        generating,
        setGenerating,
        replStart,
        replMsg,
        replComplete,
        replCancel
    }
}

export default useChat
