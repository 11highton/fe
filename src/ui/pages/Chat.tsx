import { useState, useEffect } from "react"
import { useTheme } from "@emotion/react";

import HStack from "../components/core/HStack"
import VStack from "../components/core/VStack"
import Text from "../components/core/Text"
import Icon from "../components/core/Icon"
import Image from "../components/core/Image"
import Input from "../components/core/Input"
import useChat from "../../hooks/useChat"

const Chat = () => {
    const theme = useTheme()
    const { message, setMessage, response, setResponse, generating, setGenerating, replStart, replMsg, replComplete, replCancel } = useChat()

    useEffect(() => {
        replStart()
    }, [])

    return (
        <VStack w="100%" h="100%" align="c" bgColor={theme.colors.bgRegular}>
                {generating ? (
                    <VStack w="100%" h="100%" maxw="480px" bgColor={theme.colors.bgWeak}>
                        <HStack w="100%" pv={14} ph={16} align="cl">
                            <HStack p={4} gap={6} onClick={() => {
                                replCancel()
                                setMessage("")
                                setResponse("")
                                setGenerating(false)}} cursor="pointer">
                                <Icon name={"back"} size={20} colors={[theme.colors.ctRegular]} />
                                <Text value="생성 취소" font={theme.fonts.mm} color={theme.colors.ctRegular} /> 
                            </HStack>
                        </HStack>
                        <VStack w="100%" flex={1} gap={28} align="c">
                            <Image src="/rabbit_front.png" alt="rabbit" w="40%" />
                            <Text value="악몽을 분석하는 중입니다..." font={theme.fonts.lm} color={theme.colors.ctStrong} /> 
                            <Text value="약 5분 정도 소요됩니다" font={theme.fonts.sl} color={theme.colors.ctRegular} /> 
                        </VStack>
                    </VStack>
                ) : (
                    <VStack w="100%" h="100%" maxw="480px" bgColor={theme.colors.bgWeak}>
                        <HStack w="100%" pv={10} ph={16} gap="auto" align="c">
                            <HStack p={4} onClick={() => {}} cursor="pointer">
                                <Icon name={"back"} size={20} colors={[theme.colors.ctRegular]} />
                            </HStack>
                            <HStack p={4} onClick={() => {replComplete(); setGenerating(true)}} cursor="pointer">
                                <Text value="여기까지" font={theme.fonts.sl} color={theme.colors.ctRegular} />
                            </HStack>
                        </HStack>
                        <HStack w="100%" pv={14} ph={16} align="tl">
                            <HStack w="100%" pv={24} ph={28} gap={10} align="c" r={20} bgColor={theme.colors.bgRegular}>
                                <Text value={response} w="100%" font={theme.fonts.ml} color={theme.colors.ctStrong} align="center" />
                            </HStack>
                        </HStack>
                        <HStack w="100%" flex={1} align="c">
                            <Image src="/rabbit_front.png" alt="rabbit" h="50%" />
                        </HStack>
                        <VStack w="100%" pv={14} ph={16}>
                            <HStack w="100%" pv={14} ph={20} gap={6} align="cl" r={24} bgColor={theme.colors.bgRegular}>
                                <Input
                                    w="100%"
                                    value={message}
                                    hint="메시지를 입력하세요"
                                    font={theme.fonts.sl}
                                    bgColor={theme.colors.bgRegular}
                                    valueColor={theme.colors.ctStrong}
                                    hintColor={theme.colors.ctWeak}
                                    tabIdx={0}
                                    onInput={(value) => setMessage(value)}
                                    onEnter={() => {replMsg(); setMessage("")}}
                                />
                                <HStack p={4} align="c" onClick={() => {replMsg(); setMessage("")}} cursor="pointer">
                                    <Icon name={"send"} size={20} colors={[theme.colors.ctWeak]} />
                                </HStack>
                            </HStack>
                        </VStack>
                    </VStack>
                )}
        </VStack>
    )
}

export default Chat
