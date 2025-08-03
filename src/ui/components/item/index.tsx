import HStack from "../core/HStack";
import Text from "../core/Text";
import { useTheme } from "@emotion/react";

interface ItemProps {
    title: string;
    time: string;
    onClick?: () => void;
}

const Item = ({ title, time, onClick }: ItemProps) => {
    const theme = useTheme()

    return (
        <HStack gap="auto" w="100%" p={16} r={10} align="c" bgColor={theme.colors.bgRegular} onClick={onClick}>
            <Text value={title} font={theme.fonts.mm} color={theme.colors.ctStrong}/>
            <Text value={time} font={theme.fonts.ss} color={theme.colors.ctRegular}/>
        </HStack>
    )
}

export default Item
