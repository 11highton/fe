import { useTheme } from "@emotion/react";

import HStack from "../components/core/HStack"
import VStack from "../components/core/VStack"
import Text from "../components/core/Text"
import TextField from "../components/textfield"
import Button from "../components/button"

const Login = () => {
    const theme = useTheme()

    return (
        <VStack w="100%" h="100%" align="c" bgColor={theme.colors.bgRegular}>
            <VStack w="100%" h="100%" maxw="480px" p={20} gap={20} bgColor={theme.colors.bgWeak}>
                <VStack w="100%" gap={14} pv={48} align="c">
                    <Text value="로그인" font={theme.fonts.ll} color={theme.colors.ctStrong}/>
                    <Text value="로그인하고 앱을 실행해 보세요!" font={theme.fonts.sm} color={theme.colors.ctRegular}/>
                </VStack>
                <TextField
                    w="100%"
                    value=""
                    hint="아이디 입력"
                    setValue={() => {}}
                    onEnter={() => {}}
                />
                <TextField
                    w="100%"
                    value=""
                    hint="비밀번호 입력"
                    setValue={() => {}}
                    onEnter={() => {}}
                />
                <HStack flex={1} />
                <Button w="100%" label="완료" onClick={() => {}}/>
            </VStack>
        </VStack>
    )
}

export default Login
