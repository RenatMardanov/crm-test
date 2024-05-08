import {
    Box,
    Button,
    Collapse,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { IRegistrationForm } from "../../types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserStore } from "../../store/store";

export const RegistrationForm: FC = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    const { user, registration } = useUserStore();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IRegistrationForm>({ mode: "all" });

    const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => {
        await registration(data.email, data.password);
        console.log(user);
    };

    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)} w="md" p="4" pb={10}>
            <p>reg</p>
            <FormControl isInvalid={errors.email ? true : false} pb={5}>
                <FormLabel>Email address</FormLabel>
                <Input
                    type="email"
                    errorBorderColor="red.300"
                    placeholder="Email"
                    {...register("email", {
                        required: "Пожалуйста, введите email",
                        minLength: {
                            value: 5,
                            message: "Email должен быть не менее 5 символов",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Некорректный email",
                        },
                    })}
                />
                <Collapse
                    in={errors.email ? true : false}
                    animateOpacity
                    transition={{
                        enter: { duration: 0.8, delay: 0.5 },
                        exit: { delay: 0.5, duration: 0.8 },
                    }}
                >
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                </Collapse>
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={show ? "text" : "password"}
                        errorBorderColor="red.300"
                        placeholder="*********"
                        {...register("password", {
                            required: "Пожалуйста, введите пароль",
                            minLength: {
                                value: 6,
                                message: "Пароль должен быть не менее 6 символов",
                            },
                        })}
                    />
                    <InputRightElement width="6rem">
                        <Button h="1.75rem" size="sm" onClick={handleShow}>
                            {show ? "Скрыть" : "Показать"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
            <Button
                mt={4}
                colorScheme="blue"
                isLoading={isSubmitting}
                type="submit"
                variant={"outline"}
                w="full"
            >
                Register
            </Button>
        </Box>
    );
};
