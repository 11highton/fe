import { useTheme } from "@emotion/react";

import HStack from "../components/core/HStack"
import VStack from "../components/core/VStack"
import Text from "../components/core/Text"
import TextField from "../components/textfield"
import Button from "../components/button"

const Signup = () => {
    const theme = useTheme()

    return (
        <VStack w="100%" h="100%" align="c" bgColor={theme.colors.bgRegular}>
            <VStack w="100%" h="100%" maxw="480px" p={20} gap={20} bgColor={theme.colors.bgWeak}>
                <VStack w="100%" gap={14} pv={48} align="c">
                    <Text value="회원가입" font={theme.fonts.ll} color={theme.colors.ctStrong}/>
                    <Text value="로그인 시 사용될 아이디와 비밀번호를 입력해주세요" font={theme.fonts.sm} color={theme.colors.ctRegular}/>
                </VStack>
                <TextField
                    w="100%"
                    value=""
                    hint="아이디 입력"
                    setValue={() => {}}
                    onEnter={() => {}}
                />
                <HStack h={4} />
                <TextField
                    w="100%"
                    value=""
                    hint="비밀번호 입력"
                    setValue={() => {}}
                    onEnter={() => {}}
                />
                <TextField
                    w="100%"
                    value=""
                    hint="비밀번호 확인"
                    setValue={() => {}}
                    onEnter={() => {}}
                />
                <HStack flex={1} />
                <Button w="100%" label="완료" onClick={() => {}}/>
            </VStack>
        </VStack>
    )
}

export default Signup
