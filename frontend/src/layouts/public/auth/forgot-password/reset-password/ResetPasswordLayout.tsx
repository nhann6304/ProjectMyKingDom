"use client";
import { InputForm } from "@/components/inputs/input-form";
import "./style.scss";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaCircleCheck } from "react-icons/fa6";
import ButtonForm from "@/components/buttons/ButtonForm";
import { IResetPassData } from "@/interfaces/common/IBaseResponse.interface";
import { resetPassword } from "@/apis/auth.apis";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/components/loading/Loading";

interface IProps {
    userId?: string;
}
export default function ResetPasswordLayout({ userId }: IProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const {
        reset,
        setValue,
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IResetPassData>();

    const onSubmit: SubmitHandler<IResetPassData> = (data) => {
        const { user_password, confirm_password } = data;
        const dataReset: IResetPassData = {
            confirm_password,
            user_password,
            user_id: userId,
        };
        startTransition(async () => {
            const result = await resetPassword(dataReset);

            if (result.statusCode === 200) {
                toast.success(result.message);
                router.replace(`/auth/login`, { scroll: true });
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <div className="reset-pass-container container-pub">
            {isPending ? (
                <Loading />
            ) : (
                <div className="box-reset">
                    <h1 className="reset-title">Thay đổi mật khẩu</h1>
                    <div className="box-reset-instruct">
                        <span className="instruct-text">Nhập mật khẩu mới</span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
                        <div className="box-form-reset">
                            <InputForm<IResetPassData>
                                control={control}
                                name="user_password"
                                label="Password"
                                type="password"
                                errors={errors}
                                required
                            />
                        </div>

                        <div className="box-form-reset">
                            <InputForm<IResetPassData>
                                control={control}
                                name="confirm_password"
                                label="Confirm Password"
                                type="password"
                                errors={errors}
                                required
                            />
                        </div>
                        <ButtonForm title="Đặt lại mật khẩu" />
                    </form>
                </div>
            )}
        </div>
    );
}
