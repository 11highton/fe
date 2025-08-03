import { useTheme } from "@emotion/react";

import HStack from "../components/core/HStack"
import VStack from "../components/core/VStack"
import Text from "../components/core/Text"
import Button from "../components/button";
import Image from "../components/core/Image";
import Icon from "../components/core/Icon";
import Item from "../components/item";
import TextField from "../components/textfield";

const Search = () => {
    const theme = useTheme()

    return (
        <VStack w="100%" h="100%" align="c" bgColor={theme.colors.bgRegular}>
            <VStack w="100%" h="100%" maxw="480px" p={20} bgColor={theme.colors.bgWeak}>
                <TextField
                    value=""
                    hint="꿈을 검색해보세요"
                    setValue={() => {}}
                />
                <VStack pv={20}>
                    <Item title="꿈1" time="2025-08-03"/>
                </VStack>
            </VStack>
        </VStack>
    )
}

export default Search
