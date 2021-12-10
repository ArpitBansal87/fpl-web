import { Button } from "@chakra-ui/button";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import _ from "lodash";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "urql";
import { Wrapper } from "../components/Wrapper";

interface LoginProps {
    loginUsername: string;
    loginPassword: string;
}

interface LoginDataInterface {
    loginUsername: string;
    loginPassword: string
}

interface LoginResponseData {
    id: string,
    username: string,
    firstName: string,
    token: string,
}

const REGISTER_MUTATION = `
mutation LoginMutation($loginUsername: String!, $loginPassword: String!) {
    login(username: $loginUsername, password: $loginPassword) {
      id
      email
      token
    }
  }
`;

const Index = () => {
    const [{ }, loginFunction] = useMutation(REGISTER_MUTATION);
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginProps>();
    const [mutationError, setMutationError] = useState({ loginUsername: '', loginPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordToggle = () => setShowPassword(!showPassword);
    
    const onSubmit: SubmitHandler<LoginProps> = async (data: any) => {
        console.log('inside the lement');
        await loginFunction(data).then(response => {
            console.log(response);
            if (response?.error) {
                console.log('Error in login => ');
            } else if (response?.data?.login) {
                const loginData: LoginResponseData = response?.data?.login as LoginResponseData;
                console.log('Response data => ', loginData);
            }
        })
    };

    return (
        <Wrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.loginUsername || mutationError && !_.isEmpty(mutationError.loginUsername)}>
                    <FormLabel htmlFor="loginUsername">User name</FormLabel>
                    <Input
                        id="loginUsername"
                        placeholder="User Name"
                        {...register("loginUsername", {
                            required: "This is required",
                            minLength: { value: 4, message: "Minimum length should be 4" }
                        })}
                    />
                    <FormErrorMessage>
                        {(errors.loginUsername && errors.loginUsername.message) || (mutationError && mutationError.loginUsername)}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.loginPassword || (mutationError && !_.isEmpty(mutationError.loginPassword))}>
                    <FormLabel htmlFor="name">Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            pr="4.5rem"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Password"
                            {...register("loginPassword", {
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
                        {errors.loginPassword && errors.loginPassword.message}{mutationError && mutationError.loginPassword}
                    </FormErrorMessage>
                </FormControl>
                <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
                    Submit
                </Button>
            </form>
        </Wrapper>
    );
};

export default Index;
