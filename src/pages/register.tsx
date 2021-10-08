import { useForm } from "react-hook-form";
import React from 'react';
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button
} from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";

interface registerProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export const Register: React.FC<registerProps> = ({ }) => {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm();
    function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                resolve('completed');
            }, 3000);
        });
    }
    return (
        <Wrapper variant="small">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.name}>
                    <FormLabel htmlFor="name">First name</FormLabel>
                    <Input
                        id="userName"
                        placeholder="Username"
                        {...register("username", {
                            required: "This is required",
                            minLength: { value: 4, message: "Minimum length should be 4" }
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
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