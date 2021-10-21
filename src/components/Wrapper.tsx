import { Box, Container, Center } from '@chakra-ui/layout';
import React from 'react'

interface WrapperProps {
    variant?: 'small' | 'regular'
}
export const Wrapper: React.FC<WrapperProps> = ({ children, variant = "regular" }) => {
    return (<Container maxW="container.lg" style={{ height: "100vh" }}>
        <Center h="100%">
            <Box padding="4" bg="gray.100" maxW={variant === "regular" ? "3xl" : "2xl"}>
                {children}
            </Box>
        </Center>
    </Container>);
}
