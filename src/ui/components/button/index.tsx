import { useTheme } from "@emotion/react"

import HStack from "../core/HStack"
import Text from "../core/Text"

interface ButtonProps {
    w?: string;
    h?: string;
    label: string;
    onClick: () => void;
}

const Button = ({w, h, label, onClick}: ButtonProps) => {
    const theme = useTheme()

    return (
        <HStack
            w={w}
            h={h}
            p={14}
            r={10}
            align="c"
            bgColor={theme.colors.primary}
            onClick={onClick}
            cursor="pointer"
        >
            <Text value={label} font={theme.fonts.mm} color={theme.colors.ctElevated}/>
        </HStack>
    )
}

export default Button
