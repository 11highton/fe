import { useTheme } from "@emotion/react";

import HStack from "../components/core/HStack"
import VStack from "../components/core/VStack"
import Text from "../components/core/Text"
import Button from "../components/button";
import Image from "../components/core/Image";
import Icon from "../components/core/Icon";
import Item from "../components/item";
import TextField from "../components/textfield";
import useSearch from "../../hooks/useSearch";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const { posts, setPosts, query, setQuery, searchPosts } = useSearch()

    return (
        <VStack w="100%" h="100%" align="c" bgColor={theme.colors.bgRegular}>
            <VStack w="100%" h="100%" maxw="480px" p={20} bgColor={theme.colors.bgWeak}>
                <TextField
                    value={query}
                    hint="꿈을 검색해보세요"
                    setValue={setQuery}
                    onEnter={() => {
                        searchPosts()
                    }}
                />
                <VStack flex={1} pv={20}>
                    {posts.map((post) => (
                        <Item key={post.id} title={post.title} time={post.createdAt} onClick={() => navigate(`/post/${post.id}`)}/>
                    ))}
                </VStack>
            </VStack>
        </VStack>
    )
}

export default Search
