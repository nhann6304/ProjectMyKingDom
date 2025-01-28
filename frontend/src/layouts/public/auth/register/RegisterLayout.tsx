"use client"
import { register } from "@/apis/auth.apis"
import "./style.scss"
import { InputForm } from "@/components/inputs/input-form"
import { IUser } from "@/interfaces/common/IUser.interface"
import { validateEmail } from "@/utils/validation.util"
import { Button } from "antd"
import { useTransition } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

interface IUserRegister extends IUser {
    confirm_password: string
}

export default function RegisterLayout() {
    const [pending, startTransition] = useTransition();
    const {
        reset,
        setValue,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IUserRegister>()

    const password = watch("user_password");
    const onSubmit: SubmitHandler<IUserRegister> = (data) => {

        const { confirm_password, ...dataRegister } = data;

        startTransition(async () => {
            const responseLogin = await register(dataRegister);

            if (responseLogin.statusCode === 400) {
                console.log(responseLogin.message);
            } else {
                console.log(responseLogin.message);

            }
            console.log("data::", dataRegister);
        })
    };

    return (
        <section className="register-container container-pub">
            <div className="box-register">
                <h1 className="register-title">Đăng Ký</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="register-from">
                    <div className="box-form-input">
                        <InputForm<IUserRegister>
                            control={control}
                            name="user_last_name"
                            label="Tên"
                            errors={errors}
                            required
                        />
                    </div>

                    <div className="box-form-input">
                        <InputForm<IUserRegister>
                            control={control}
                            name="user_first_name"
                            label="Họ"
                            errors={errors}
                            required
                        />
                    </div>

                    <div className="box-form-input">
                        <InputForm<IUserRegister>
                            control={control}
                            name="user_phone"
                            label="Số điện thoại"
                            errors={errors}
                            required
                        />
                    </div>

                    <div className="box-form-input">
                        <InputForm<IUserRegister>
                            control={control}
                            name="user_gender"
                            label="Giới tính"
                            errors={errors}
                            type="select"
                            required
                        />
                    </div>

                    <div className="box-form-input">
                        <InputForm<IUserRegister>
                            control={control}
                            name="user_email"
                            label="Email"
                            errors={errors}
                            required
                            extraValidate={(val: string) =>
                                validateEmail(val) || "Sai định dạng email"
                            }
                        />
                    </div>

                    <div className="box-form-double">
                        <InputForm<IUserRegister>
                            control={control}
                            name="user_password"
                            label="Mật khẩu"
                            errors={errors}
                            type="password"
                            required
                        />

                        <InputForm<IUserRegister>
                            control={control}
                            name="confirm_password"
                            label="Nhập lại mật khẩu"
                            errors={errors}
                            type="password"
                            extraValidate={(value) => value === password || "Mật khẩu không khớp"}
                            required
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
                    </div>

                </form>
            </div>
        </section>
    )
}
