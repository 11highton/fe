import { useTheme } from "@emotion/react"

import HStack from "../core/HStack"
import Text from "../core/Text"

const TextBox = ({ value }: { value: string }) => {
    const theme = useTheme()

    return (
        <HStack bgColor={theme.colors.bgRegular} r={20} p={14}>
            <Text value={value} font={theme.fonts.sm} color={theme.colors.ctRegular} />
        </HStack>
    )
}

export default TextBox
