"use client"
import "./style.scss"
import { register } from "@/apis/auth.apis"
import { InputForm } from "@/components/inputs/input-form"
import { useRouter } from "next/navigation"
import { IUser } from "@/interfaces/common/IUser.interface"
import { validateEmail } from "@/utils/validation.util"
import { useState, useTransition } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import ButtonForm from "@/components/buttons/ButtonForm"
import Loading from "@/components/loading/Loading"
import { Checkbox, CheckboxProps } from "antd"
import Link from "next/link"
import toast from "react-hot-toast"


interface IUserRegister extends IUser {
    confirm_password: string
}

export default function RegisterLayout() {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const [checked, setChecked] = useState<boolean>(false);
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
                toast.error(responseLogin.message)
            } else {
                toast.error(responseLogin.message)
                router.replace("/", { scroll: true });
            }
        })
    };

    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log('checked = ', e.target.checked);
        setChecked(e.target.checked);
    };

    return (
        <section className="register-container container-pub">
            {pending ? (
                <Loading />
            ) :
                (<div className="box-register">
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

                        <div className="box-form-clause">
                            <Checkbox className="checkbox-container" checked={checked} onChange={onChange} />
                            <div className="clause-text-box">
                                <p> Tôi đã đọc và đồng ý với</p>
                                <Link className="clause" href={"#"}> Điều khoản sử dụng và Chính sách Thành viên thân thiết My Points</Link>
                            </div>
                        </div>

                        <ButtonForm title="Đăng ký" />

                        <div className="text-question-account">
                            <span>Đã có tài khoản?</span>
                            <Link className="register-account" href={"/auth/login"} >Đăng nhập</Link>
                        </div>
                    </form>
                </div>)
            }
        </section>
    )
}
