"use client";
import { useForm } from "react-hook-form";
import "./style.scss";
import { InputForm } from "@/components/inputs/input-form";
import { useUserCurrent } from "@/stores/userCurrent/userCurrent";
import { formatPhoneNumber } from "@/utils/phone.util";
import { logout } from "@/apis/auth.apis";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Loading from "@/components/loading/Loading";
import { Settings } from "react-slick";
export default function AccountLayout() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const { userCurrent, logout: logoutZustand } = useUserCurrent();
    const {
        reset,
        setValue,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<any>();

    const handleLogout = () => {
        startTransition(async () => {
            const result = await logout();
            logoutZustand();
            if (result.statusCode === 200) {
                toast.success(result.message);
                router.replace(`/`, { scroll: true });
            } else {
                toast.error(`Có lỗi sảy ra ${result.message}`);
            }
        });
    };

    return (
        <section className="account-container container-pub">
            {isPending ? (
                <Loading />
            ) : (
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
                                    <li onClick={handleLogout} className="option-box-item">
                                        Đăng xuất
                                    </li>
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
                                    <h1>
                                        {userCurrent?.user.user_first_name || ""}{" "}
                                        {userCurrent?.user.user_last_name || ""}
                                    </h1>
                                </div>

                                <div className="content-item">
                                    <label className="content-label">Số điện thoại</label>
                                    <h1>{formatPhoneNumber(userCurrent?.user.user_phone || "")}</h1>
                                </div>

                                <div className="content-item">
                                    <label className="content-label">Email</label>
                                    <h1>{userCurrent?.user.user_email || ""}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
