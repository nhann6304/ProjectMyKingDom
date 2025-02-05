"use client";
import "./style.scss";
import { Button, Input } from "antd";
import { OTPProps } from "antd/es/input/OTP";
import { FaCircleCheck } from "react-icons/fa6";
import Link from "next/link";
import {
    Controller,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { IVerifyOtp } from "@/interfaces/common/IBaseResponse.interface";
import { useTransition } from "react";
import { verifyOtp } from "@/apis/auth.apis";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";

interface IProps {
    userId?: string;
}

export default function OtpLayout({ userId }: IProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const {
        reset,
        setValue,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IVerifyOtp>();

    const onSubmit: SubmitHandler<IVerifyOtp> = (data) => {
        const otpValue = data.otp;
        if (userId) {
            startTransition(async () => {
                const result = await verifyOtp({
                    params: userId,
                    payload: { otp: otpValue },
                });

                if (result.statusCode === 400) {
                    toast.error(result.message);
                } else {
                    toast.success(result.message);
                    router.replace(
                        `/auth/forgot-password/reset-password/${result?.metadata?.user?.id}`,
                        { scroll: true }
                    );
                }
            });
        }
    };

    return (
        <section className="otp-container container-pub">
            {isPending ? (
                <Loading />
            ) : (
                <div className="box-otp">
                    <h1 className="otp-title">Đặt lại mật khẩu</h1>
                    <div className="box-otp-instruct">
                        <FaCircleCheck className="instruct-icon" size={20} color="green" />
                        <span className="instruct-text">
                            Chúng tôi đã gửi cho bạn email chứa liên kết cập nhật mật khẩu.
                        </span>
                    </div>
                    <form className="otp-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="box-form-otp">
                            <Controller
                                name="otp"
                                control={control}
                                rules={{ required: "Vui lòng nhập mã OTP" }}
                                render={({ field }) => (
                                    <Input.OTP
                                        {...field}
                                        inputMode="numeric"
                                        formatter={(str) => str.replace(/\D/g, "")}
                                    />
                                )}
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
                                Xác nhận
                            </Button>

                            <Link className="text-question" href={"#"}>
                                Bạn không nhân được mã ?
                            </Link>
                        </div>
                    </form>
                </div>
            )}
        </section>
    );
}
