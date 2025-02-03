"use client"
import { useForm } from "react-hook-form";
import "./style.scss";
import { InputForm } from "@/components/inputs/input-form";
export default function AccountLayout() {
    const {
        reset,
        setValue,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<any>()
    return (
        <section className="account-container container-pub">
            <div className="box-account">
                <h1 className="account-title">Tài khoản của bạn</h1>
                <div className="box-information">
                    <div className="info-option">
                        <div className="option-header">
                            <h1>Tài Khoản Của Bạn</h1>
                        </div>

                        <div className="option-body">
                            <ul className="option-box">
                                <li className="option-box-item">Tài khoản</li>
                                <li className="option-box-item">Lịch sử mua hàng</li>
                                <li className="option-box-item">Danh sách yêu thích</li>
                                <li className="option-box-item">Địa chỉ giao hàng</li>
                                <li className="option-box-item">Đăng xuất</li>
                            </ul>

                            <div className="option-responsive">
                                <InputForm<any>
                                    control={control}
                                    errors={errors}
                                    name="user_gender"
                                    type="select"
                                />
                            </div>

                        </div>
                    </div>

                    <div className="info-desc">
                        <div className="desc-title">
                            <h2>Thông tin tài khoản</h2>
                        </div>

                        <div className="dest-box-content">
                            <div className="content-item">
                                <label className="content-label">Họ và tên</label>
                                <h1>Nhan Huynh</h1>
                            </div>

                            <div className="content-item">
                                <label className="content-label">Họ và tên</label>
                                <h1>Nhan Huynh</h1>
                            </div>

                            <div className="content-item">
                                <label className="content-label">Họ và tên</label>
                                <h1>Nhan Huynh</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
