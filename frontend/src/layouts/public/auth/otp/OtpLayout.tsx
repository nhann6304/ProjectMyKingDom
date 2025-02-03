"use client";
import "./style.scss";
import { Button, Input } from "antd";
import { OTPProps } from "antd/es/input/OTP";
import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";
// onSubmit = { handleSubmit(onSubmit) }
export default function OtpLayout() {
    const onChange: OTPProps["onChange"] = (text) => {
        console.log("onChange:", text);
    };

    const onInput: OTPProps["onInput"] = (value) => {
        console.log("onInput:", value);
    };

    const sharedProps: OTPProps = {
        onChange,
        onInput,
    };
    return (
        <section className="otp-container container-pub">
            <div className="box-otp">
                <h1 className="otp-title">Đặt lại mật khẩu</h1>
                <div className="box-otp-instruct">
                    <FaCircleCheck className="instruct-icon" size={20} color="green" />
                    <span className="instruct-text">
                        Chúng tôi đã gửi cho bạn email chứa liên kết cập nhật mật khẩu.
                    </span>
                </div>
                <form className="otp-form">
                    <div className="box-form-otp">
                        <Input.OTP
                            inputMode="numeric"
                            formatter={(str) => str.replace(/\D/g, '')}
                            {...sharedProps}
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

                        <Link className="text-question" href={"#"} >Bạn không nhân được mã ?</Link>
                    </div>
                </form>
            </div>
        </section>
    );
}
