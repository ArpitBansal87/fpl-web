import { useForm, Controller, SubmitHandler } from "react-hook-form";
import React from 'react';
import {
    FormErrorMessage,
    FormLabel,
    FormControl,
    Input,
    Button
} from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";

interface RegisterProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export const Register: React.FC<RegisterProps> = ({ }) => {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<RegisterProps>();
    const onSubmit: SubmitHandler<RegisterProps> = (data: any) => {
        console.log(data);
        console.log('inside the oinSubmit form handler');
      };
    return (
        <Wrapper variant="small">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.firstName}>
                    <FormLabel htmlFor="name">First name</FormLabel>
                    <Input
                        id="firstName"
                        placeholder="First Name"
                        {...register("firstName", {
                            required: "This is required",
                            minLength: { value: 4, message: "Minimum length should be 4" }
                        })}
                    />
                    <FormErrorMessage>
                        {errors.firstName && errors.firstName.message}
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