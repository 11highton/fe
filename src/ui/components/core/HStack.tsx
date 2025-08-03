import styled from "@emotion/styled";
import { motion } from "framer-motion"
import type { TargetAndTransition, Variants, Transition } from "framer-motion"
import type {
    SizeProps,
    SpacingProps,
    ShapeProps,
    LayoutProps,
    PositionProps,
    DisplayProps,
} from "../../../schemas/styles";
import {
    parseSize,
    parseSpacing,
    parseShape,
    parseLayout,
    parsePosition,
    parseDisplay,
} from "../../../utils/parseStyles";

interface HStackProps extends SizeProps, SpacingProps, ShapeProps, LayoutProps, PositionProps, DisplayProps {
    children?: React.ReactNode;

    hover?: DisplayProps;
    focus?: DisplayProps;
    active?: DisplayProps;

    tabIdx?: number;
    onClick?: () => void;

    initial?: TargetAndTransition;
    animate?: TargetAndTransition;
    exit?: TargetAndTransition;
    whileHover?: TargetAndTransition;
    whileTap?: TargetAndTransition;
    whileDrag?: TargetAndTransition;
    variants?: Variants;
    transition?: Transition;
}

const StyledHStack = styled(motion.div)<HStackProps>(
    parseSize,
    parseSpacing,
    parseShape,
    parseLayout,
    parsePosition,
    parseDisplay,
    props => ({
        "&:hover": parseDisplay(props.hover ?? {}),
        "&:focus": parseDisplay(props.focus ?? {}),
        "&:active": parseDisplay(props.active ?? {}),
    })
)

const HStack = ({ children, tabIdx, onClick, ...props }: HStackProps) => {
    return (
        <StyledHStack
            dir="r"
            tabIndex={tabIdx}
            onClick={onClick}
            {...props}
        >
            {children}
        </StyledHStack>
    )
}

export default HStack
