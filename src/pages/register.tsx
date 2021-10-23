import { useForm, Controller, SubmitHandler } from "react-hook-form";
import React, { useState } from 'react';
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button,
    InputGroup,
    InputRightElement,
    useToast,
    Center,
} from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { useEffect } from "react";
import { useMutation } from "urql";
import _ from "lodash";

interface RegisterProps {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterInput {
    "username": string,
    "password": string,
    "confirmPassword": string,
    "email": string
}

const REGISTER_MUTATION = `
mutation RegisterMutation($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      createdAt
      id
      username
    }
  }
  `;

export const Register: React.FC<RegisterProps> = ({ }) => {

    const [{ }, registerFunction] = useMutation(REGISTER_MUTATION);
    const toast = useToast();
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<RegisterProps>();
    const onSubmit: SubmitHandler<RegisterProps> = async (data: any) => {
        setMutationError({
            username: '',
            confirmPassword: '',
            password: '',
            email: '',
        });
        await registerFunction({ registerInput: data as RegisterInput }).then(response => {
            if (response.error) {
                const graphQLError = _.head(response?.error?.graphQLErrors);
                if (graphQLError) setMutationError(graphQLError?.extensions?.errors);
            }
            else if (response.data) {
                const responseObj = response?.data?.register;
                toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
            }
        })
    };
    const [mutationError, setMutationError] = useState({ username: '', confirmPassword: '', password: '', email: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handlePasswordToggle = () => setShowPassword(!showPassword);
    const handleConfirmPasswordToggle = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <Wrapper variant="small">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.username || mutationError && !_.isEmpty(mutationError.username)}>
                    <FormLabel htmlFor="name">User name</FormLabel>
                    <Input
                        id="username"
                        placeholder="User Name"
                        {...register("username", {
                            required: "This is required",
                            minLength: { value: 4, message: "Minimum length should be 4" }
                        })}
                    />
                    <FormErrorMessage>
                        {(errors.username && errors.username.message) || (mutationError && mutationError.username)}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email || (mutationError && !_.isEmpty(mutationError.email))}>
                    <FormLabel htmlFor="name">Email</FormLabel>
                    <Input
                        id="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "This is required",
                            minLength: { value: 4, message: "Minimum length should be 4" }
                        })}
                        type="email"
                    />
                    <FormErrorMessage>
                        {errors.email && errors.email.message}{mutationError && mutationError.email}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password || (mutationError && !_.isEmpty(mutationError.password))}>
                    <FormLabel htmlFor="name">Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            {...register("password", {
                                required: "This is required",
                                minLength: { value: 4, message: "Minimum length should be 4" }
                            })}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handlePasswordToggle}>
                                {showPassword ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                        {errors.password && errors.password.message}{mutationError && mutationError.password}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.confirmPassword || (mutationError && !_.isEmpty(mutationError.confirmPassword))}>
                    <FormLabel htmlFor="name">Confirm Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            {...register("confirmPassword", {
                                required: "This is required",
                                minLength: { value: 4, message: "Minimum length should be 4" },
                            })}
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleConfirmPasswordToggle}>
                                {showConfirmPassword ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                        {errors.confirmPassword && errors.confirmPassword.message}{mutationError && mutationError.confirmPassword}
                    </FormErrorMessage>
                </FormControl>
                <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                    Submit
                </Button>
            </form>
        </Wrapper>
    );
}

export default Register;