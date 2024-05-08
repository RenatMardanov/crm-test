import { FC } from "react";
import { useUserStore } from "../../store/store";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IRegistrationForm } from "../../types/types";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { FormItem } from "react-hook-form-antd";

export const LoginForm: FC = () => {
    // const [show, setShow] = useState(false);
    const { user, login } = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from?.pathname || "/";

    const {
        control,
        handleSubmit,
        // formState: { errors, isSubmitting },
    } = useForm<IRegistrationForm>({ mode: "all" });

    // const handleShow = () => setShow(!show);
    // const onSubmit: SubmitHandler<IRegistrationForm> = async (data) => {
    //     await login(data.email, data.password);
    //     console.log(user);
    //     navigate(fromPage || "/");
    // };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={handleSubmit(async (data) => {
                await login(data.email, data.password);
                console.log(user);
                navigate(fromPage || "/");
            })}
        >
            <FormItem
                control={control}
                name="email"
                // {...register("email", {
                //     required: "Пожалуйста, введите email",
                //     minLength: {
                //         value: 5,
                //         message: "Email должен быть не менее 5 символов",
                //     },
                //     pattern: {
                //         value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                //         message: "Некорректный email",
                //     },
                // })}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                />
            </FormItem>
            <FormItem
                control={control}
                name="password"

                // {...register("password", {
                //     required: "Пожалуйста, введите пароль",
                //     minLength: {
                //         value: 6,
                //         message: "Пароль должен быть не менее 6 символов",
                //     },
                // })}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </FormItem>

            <div>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <a href="">register now!</a>
            </div>
        </Form>
    );
};
