"use client";
import "./style.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTransition } from "react";
import { Button } from "antd";
import Link from "next/link";
import { login } from "@/apis/auth.apis";
import { InputForm } from "@/components/inputs/input-form";
import { IUser } from "@/interfaces/common/IUser.interface";
import { validateEmail } from "@/utils/validation.util";
import toast from "react-hot-toast";
import Loading from "@/components/loading/Loading";
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
    } = useForm<IAuthLogin>();

    const onSubmit: SubmitHandler<IAuthLogin> = (data) => {
        startTransition(async () => {
            const responseLogin = await login(data);

            if (responseLogin.statusCode === 400) {
                toast.error(responseLogin.message);
                console.log(responseLogin.message);
            } else {
                toast.success(responseLogin.message);
                console.log(responseLogin.message);
            }
        });

        console.log("Dữ liệu form:", data);
    };

    return (
        <section className="login-container container-pub">
            {isPending ? (
                <Loading />
            ) : (
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
                                background="#e8f0fe"
                                extraValidate={(val: string) =>
                                    validateEmail(val) || "Sai định dạng email"
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
                                background="#e8f0fe"
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

                            <Link
                                className="text-forgot"
                                href={"/auth/forgot-password/send-email"}
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <div className="text-question-account">
                            <span>Chưa có tài khoản?</span>
                            <Link className="register-account" href={"/auth/register"}>
                                Đăng ký tài khoản
                            </Link>
                        </div>
                    </form>
                </div>
            )}
        </section>
    );
}
