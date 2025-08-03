import Input from "../core/Input"

import { useTheme } from "@emotion/react"

interface TextFieldProps {
    w?: string;
    h?: string;
    value: string;
    hint: string;
    setValue: (value: string) => void;
    onEnter?: () => void;
}

const TextField = ({ w, h, value, hint, setValue, onEnter }: TextFieldProps) => {
    const theme = useTheme()

    return (
        <Input
            w={w}
            h={h}
            ph={16}
            pv={14}
            r={8}
            value={value}
            hint={hint}
            font={theme.fonts.sl}
            bgColor={theme.colors.bgRegular}
            valueColor={theme.colors.ctStrong}
            hintColor={theme.colors.ctWeak}
            onInput={(value) => setValue(value)}
            onEnter={() => {onEnter?.()}}
        />
    )
}

export default TextField
