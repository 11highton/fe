import { useState } from "react";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import HStack from "../components/core/HStack"
import VStack from "../components/core/VStack"
import Text from "../components/core/Text"
import TextField from "../components/textfield"
import Button from "../components/button"
import HttpService from "../../hooks/useHttp";

const Login = () => {
    const theme = useTheme()
    const http = new HttpService()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <VStack w="100%" h="100%" align="c" bgColor={theme.colors.bgRegular}>
            <VStack w="100%" h="100%" maxw="480px" p={20} gap={20} bgColor={theme.colors.bgWeak}>
                <VStack w="100%" gap={14} pv={48} align="c">
                    <Text value="로그인" font={theme.fonts.ll} color={theme.colors.ctStrong}/>
                    <Text value="로그인하고 앱을 실행해 보세요!" font={theme.fonts.sm} color={theme.colors.ctRegular}/>
                </VStack>
                <TextField
                    w="100%"
                    value={email}
                    hint="아이디 입력"
                    setValue={setEmail}
                    onEnter={() => {}}
                />
                <TextField
                    type="password"
                    w="100%"
                    value={password}
                    hint="비밀번호 입력"
                    setValue={setPassword}
                    onEnter={() => {}}
                />
                <HStack flex={1} />
                <Button w="100%" label="완료" onClick={() => {
                    http.post('/login', { email, password })
                    navigate('/')
                }}/>
            </VStack>
        </VStack>
    )
}

export default Login
