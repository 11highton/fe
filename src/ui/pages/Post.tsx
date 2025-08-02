import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import HStack from "../components/core/HStack"
import VStack from "../components/core/VStack"
import Text from "../components/core/Text"
import Icon from "../components/core/Icon"
import Image from "../components/core/Image"
import usePost from "../../hooks/usePost"

const Post = () => {
    const { id } = useParams();
    const theme = useTheme()
    const { title, setTitle, idx, setIdx, total, setTotal, script, setScript } = usePost(id!)

    return (
        <VStack w="100%" h="100%" align="c" bgColor={theme.colors.bgRegular}>
            <VStack w="100%" h="100%" maxw="480px" bgColor={theme.colors.bgWeak}>
                <HStack w="100%" pv={14} ph={20} gap={6} align="cl">
                    <Icon name="back" size={24} colors={[theme.colors.ctRegular]} />
                    <VStack flex={1} gap={6}>
                        <Text w="100%" value={`${idx}/${total}`} font={theme.fonts.sm} color={theme.colors.ctRegular} align="center" />
                        <Text w="100%" value={title} font={theme.fonts.ls} color={theme.colors.ctRegular} align="center" />
                    </VStack>
                    <Icon name="volume" size={24} colors={[theme.colors.ctRegular]} />
                </HStack>
                <VStack w="100%" flex={1} gap={24} align="c">
                    <Image src="/rabbit_front.png" alt="rabbit" w="40%" />
                    <Text value={script[idx]} font={theme.fonts.lm} color={theme.colors.ctStrong} /> 
                </VStack>
                <HStack w="100%" pv={28} gap={40} align="c">
                    <HStack align="c" p={18} r={32} olColor={theme.colors.outline} onClick={() => {if (idx > 1) setIdx(idx - 1)}} cursor="pointer">
                        <Icon name={"prev"} size={20} colors={[theme.colors.ctRegular]} />
                    </HStack>
                    <HStack align="c" p={18} r={32} olColor={theme.colors.outline} onClick={() => {}} cursor="pointer">
                        <Icon name={"pause"} size={20} colors={[theme.colors.ctRegular]} />
                    </HStack>
                    <HStack align="c" p={18} r={32} olColor={theme.colors.outline} onClick={() => {if (idx < total) setIdx(idx + 1)}} cursor="pointer">
                        <Icon name={"next"} size={20} colors={[theme.colors.ctRegular]} />
                    </HStack>
                </HStack>
                <HStack w="100%" pv={16} ph={16} gap={10} align="c" onClick={() => {}} cursor="pointer">
                    <Text value="해몽으로 넘기기" font={theme.fonts.mm} color={theme.colors.ctRegular} />
                    <Icon name={"front"} size={20} colors={[theme.colors.ctRegular]} />
                </HStack>
            </VStack>
        </VStack>
    )
}

export default Post
