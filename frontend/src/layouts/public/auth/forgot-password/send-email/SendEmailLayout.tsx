"use client";
import { InputForm } from "@/components/inputs/input-form";
import "./style.scss";
import { FaCircleCheck } from "react-icons/fa6";
import { SubmitHandler, useForm } from "react-hook-form";
import { validateEmail } from "@/utils/validation.util";
import ButtonForm from "@/components/buttons/ButtonForm";
import { IUser } from "@/interfaces/common/IUser.interface";
import { useTransition } from "react";
import { sendEmail } from "@/apis/auth.apis";
import { useRouter } from "next/navigation";
interface ISendPasswordEmail extends Pick<IUser, "user_email"> { }
export default function SendEmailLayout() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    const {
        reset,
        setValue,
        control,
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ISendPasswordEmail>();

    const onSubmit: SubmitHandler<ISendPasswordEmail> = (data) => {
        startTransition(async () => {
            // const responseSendOtp = await sendEmail(data);

            // console.log("Kết quả ra nè ", responseSendOtp.metadata?.user);
            router.replace("/auth/test/12312", { scroll: true })
        })
    }

    return (
        <div className="send-email-container container-pub">
            <div className="box-send-email">
                <h1 className="send-email-title">Đặt lại mật khẩu</h1>
                <div className="box-send-email-instruct">
                    <FaCircleCheck className="instruct-icon" size={20} color="green" />
                    <span className="instruct-text">
                        Chúng tôi đã gửi cho bạn email chứa liên kết cập nhật mật khẩu.
                    </span>
                </div>

                <form className="box-send-email-form" onSubmit={handleSubmit(onSubmit)}>
                    <InputForm<ISendPasswordEmail>
                        control={control}
                        name="user_email"
                        errors={errors}
                        placeholder="Nhập email"
                        background="#e8f0fe"
                        extraValidate={(val: string) =>
                            validateEmail(val) || "Sai định dạng email"
                        }
                    />

                    <ButtonForm title="Xác nhận" />
                </form>
            </div>
        </div>
    );
}
