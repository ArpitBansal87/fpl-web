import { Box, Container } from '@chakra-ui/layout';
import React from 'react'

interface WrapperProps {
    variant?: 'small' | 'regular'
}
export const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {
    return (<Container maxW="container.lg">
        <Box padding="4" bg="gray.100" maxW={variant === "regular" ? "3xl" : "xl"}>{children}</Box></Container>);
}
