import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import HStack from "../components/core/HStack"
import VStack from "../components/core/VStack"
import Text from "../components/core/Text"
import Button from "../components/button";
import Image from "../components/core/Image";
import Icon from "../components/core/Icon";
import Item from "../components/item";
import useHome from "../../hooks/useHome";

const Home = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const { posts, setPosts, name, setName } = useHome()

    return (
        <VStack w="100%" h="100%" align="c" bgColor={theme.colors.bgRegular}>
            <VStack w="100%" h="100%" maxw="480px" p={20} bgColor={theme.colors.bgWeak} pos="rel">
                <Text value={`안녕하세요 ${name}님!`} font={theme.fonts.lm} color={theme.colors.ctStrong}/>
                <Text value="오늘은 어떤 꿈을 꾸셨나요?" font={theme.fonts.lm} color={theme.colors.ctStrong}/>
                <VStack w="100%" pv={40} align="c">
                    <Image w="50%" src="/rabbit_side.png" alt="rabbit" />
                </VStack>
                <HStack gap="auto" pv={10} align="c">
                    <Text value="나의 꿈모음" font={theme.fonts.mm} color={theme.colors.ctStrong}/>
                    <HStack ph={10} pv={6} r={10} align="c" gap={4} olColor={theme.colors.outline} onClick={() => navigate("/search")} cursor="pointer">
                        <Icon name="search" size={10} colors={[theme.colors.ctRegular]}/>
                        <Text value="해몽 검색" font={theme.fonts.ss} color={theme.colors.ctRegular}/>
                    </HStack>
                </HStack>
                <VStack flex={1}>
                    {posts.map((post) => (
                        <Item key={post.id} title={post.title} time={post.createdAt} onClick={() => navigate(`/post/${post.id}`)}/>
                    ))}
                </VStack>
                <VStack p={16} r={20} align="c" pos="abs" b={20} rr={20} bgColor={theme.colors.primary} onClick={() => navigate("/chat")} cursor="pointer">
                    <Icon name="add" size={24} colors={[theme.colors.ctElevated]}/>
                </VStack>
            </VStack>
        </VStack>
    )
}

export default Home
