"use client"
import "./style.scss"
import { InputForm } from "@/components/inputs/input-form"
import { IUser } from "@/interfaces/common/IUser.interface"
import { validateEmail } from "@/utils/validation.util"
import { SubmitHandler, useForm } from "react-hook-form"


export default function RegisterLayout() {
    const {
        reset,
        setValue,
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IUser>()

    const onSubmit: SubmitHandler<any> = (data) => {
        // startTransition(async () => {
        //     const responseLogin = await login(data);

        //     if (responseLogin.statusCode === 400) {
        //         console.log(responseLogin.message);
        //     } else {

        //         console.log(responseLogin.message);

        //     }

        // })

        console.log("Dữ liệu form:", data);
    };

    return (
        <section className="register-container container-pub">
            <div className="box-register">
                <h1 className="register-title">Đăng Ký</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="register-from">
                    <div className="box-form-input">
                        <InputForm<IUser>
                            control={control}
                            name="user_last_name"
                            label="Tên"
                            errors={errors}
                            required
                        />
                    </div>

                    <div className="box-form-input">
                        <InputForm<IUser>
                            control={control}
                            name="user_first_name"
                            label="Họ"
                            errors={errors}
                            required
                        />
                    </div>

                    <div className="box-form-input">
                        <InputForm<IUser>
                            control={control}
                            name="user_phone"
                            label="Số điện thoại"
                            errors={errors}
                            required
                        />
                    </div>

                    <div className="box-form-input">
                        <InputForm<IUser>
                            control={control}
                            name="user_gender"
                            label="Giới tính"
                            errors={errors}
                            type="select"
                            required
                        />
                    </div>

                    <div className="box-form-double">
                        <InputForm<IUser>
                            control={control}
                            name="user_password"
                            label="Mật khẩu"
                            errors={errors}
                            required
                        />

                        <InputForm<IUser>
                            control={control}
                            name="user_password"
                            label="Nhập lại mật khẩu"
                            errors={errors}
                            required
                        />
                    </div>

                    <button type="submit">Gửi</button>

                </form>
            </div>
        </section>
    )
}
