"use client"
import "./style.scss"
import { SubmitHandler, useForm } from "react-hook-form"
import { useTransition } from "react"
import { Button } from "antd"
import Link from "next/link"
import { login } from "@/apis/auth.apis"
import { InputForm } from "@/components/inputs/input-form"
import { IUser } from "@/interfaces/common/IUser.interface"
import { validateEmail } from "@/utils/validation.util"
interface IAuthLogin extends Pick<IUser, "user_email" | "user_password"> { }
export default function LoginLayout() {
    const [isPending, startTransition] = useTransition();

    const {
        reset,
        setValue,
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IAuthLogin>()

    const onSubmit: SubmitHandler<IAuthLogin> = (data) => {
        startTransition(async () => {
            const responseLogin = await login(data);

            if (responseLogin.statusCode === 400) {
                console.log(responseLogin.message);
            } else {

                console.log(responseLogin.message);

            }

        })

        console.log("Dữ liệu form:", data);
    };

    return (
        <section className="login-container container-pub">
            <div className="box-login">
                <h1 className="login-title">Đăng nhập</h1>
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="box-form-email">
                        <InputForm<IAuthLogin>
                            control={control}
                            name="user_email"
                            label="Email"
                            errors={errors}
                            required
                            placeholder="Nhập email"
                            extraValidate={(val: string) =>
                                validateEmail(val) || "Sai email"
                            }
                        />
                    </div>

                    <div className="box-form-password">
                        <InputForm<IAuthLogin>
                            control={control}
                            name="user_password"
                            label="Mật khẩu"
                            errors={errors}
                            type="password"
                            required
                            placeholder="Mật khẩu"
                        />
                    </div>

                    <div className="button-submit">
                        <Button
                            className="custom-button"
                            htmlType="submit"
                            type="default"
                            size="large"
                            block
                        >
                            Đăng nhập
                        </Button>

                        <Link className="text-forgot" href={"#"} >Quên mật khẩu?</Link>
                    </div>
                    <div className="text-question-account">
                        <span>Chưa có tài khoản?</span>
                        <Link className="register-account" href={"#"} >Đăng ký tài khoản</Link>
                    </div>
                </form>
            </div>
        </section>
    )
}
