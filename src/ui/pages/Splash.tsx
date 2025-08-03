import { useTheme } from "@emotion/react";

import HStack from "../components/core/HStack"
import VStack from "../components/core/VStack"
import Text from "../components/core/Text"
import Button from "../components/button"
import Image from "../components/core/Image"
import TextBox from "../components/textbox"

const Splash = () => {
    const theme = useTheme()

    return (
        <VStack w="100%" h="100%" align="c" bgColor={theme.colors.bgRegular}>
            <VStack w="100%" h="100%" maxw="480px" p={20} gap={10} align="c" bgColor={theme.colors.bgWeak}>
                <VStack ph={80} align="c">
                    <Image w="60%" src="/brand.png" alt="brand" />
                </VStack>
                <VStack w="100%" ph={20} pv={80} gap={24}>
                    <VStack w="100%" align="tl"><TextBox value="😵‍💫 악몽을 꾼 날은 하루종일 찝찝해..." /></VStack>
                    <VStack w="100%" align="tr"><TextBox value="💡 내 꿈의 의미가 궁금해" /></VStack>
                    <VStack w="100%" align="c"><TextBox value="💭 다른 사람들은 어떤 꿈을 꿀까?" /></VStack>
                </VStack>
                <Button w="100%" label="완료" onClick={() => {}}/>
                <HStack p={6} onClick={() => {}} cursor="pointer">
                    <Text value="회원가입하기" font={theme.fonts.sm} color={theme.colors.ctRegular} />
                </HStack>
            </VStack>
        </VStack>
    )
}

export default Splash
