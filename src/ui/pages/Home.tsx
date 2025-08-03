import { useTheme } from "@emotion/react";

import HStack from "../components/core/HStack"
import VStack from "../components/core/VStack"
import Text from "../components/core/Text"
import Button from "../components/button";

import { loginRes } from "../../schemas/auth";
import HttpService from "../../hooks/useHttp";

const Home = () => {
    const theme = useTheme()
    const http = new HttpService()

    return (
        <VStack w="100%" h="100%" align="c" bgColor={theme.colors.bgWeak}>
        </VStack>
    )
}

export default Home
