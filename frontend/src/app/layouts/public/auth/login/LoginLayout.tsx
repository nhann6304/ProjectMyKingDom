"use client"
import { InputForm } from "@/app/components/inputs/input-form"
import "./style.scss"
import { useForm } from "react-hook-form"
import { validateEmail } from "@/app/utils/validation.util"
export default function LoginLayout() {
    interface abc {
        email: string
        password: string
    }
    const {
        reset,
        setValue,
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<abc>()

    const onSubmit = (data: abc) => {
        // Xử lý dữ liệu khi form được submit
        console.log("Dữ liệu form:", data);
    };

    return (
        <section className="login-container container-pub">
            <div className="box-login">
                <h1 className="login-title">Đăng nhập</h1>
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="box-form-email">
                        <InputForm<abc>
                            control={control}
                            name="email"
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
                        <InputForm<abc>
                            control={control}
                            name="password"
                            label="Password"
                            errors={errors}
                            required
                            placeholder="Mật khẩu"
                        />
                    </div>
                </form>
            </div>
        </section>
    )
}
