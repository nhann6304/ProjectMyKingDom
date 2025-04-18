"use client";
import TopNavPublic from "@/components/navbar/navbar-public/top-nav/TopNav";
import "./style.scss";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import logo from "@/assets/common/icon-public/jpg/logo-254x76 (1).png";
import ButtonCommon from "@/components/buttons/ButtonCommon";
import ButtonForm from "@/components/buttons/ButtonForm";
// icon social
import facebookIcon from "@/assets/common/icons/social/facebook.png";
import instagramIcon from "@/assets/common/icons/social/instagram.png";
import youtubeIcon from "@/assets/common/icons/social/youtube.png";
import tiktokIcon from "@/assets/common/icons/social/tiktok.png";
import zaloIcon from "@/assets/common/icons/social/zalo.png";
// system
import cleverLogo from "@/assets/common/icon-public/jpg/footer/system/clever-logo.svg";
import hobiverseLogo from "@/assets/common/icon-public/jpg/footer/system/hobiverse-logo.svg";
import { TruckLive } from "@/assets/common/icon-public/svg/icon/iconItem";
import hethongcuahang from "@/assets/common/icon-public/jpg/footer/system/he-thong-cua-hang.webp"
import {
    CalendarIcon,
    EmailIcon,
    LiveIcon,
    PhoneIcon,
} from "@/assets/common/icon-public/jpg/footer/icon-svg/footer_icon";

const listIconSocial: { name: string; icon: StaticImageData; link?: string }[] =
    [
        {
            name: "facebook",
            icon: facebookIcon,
        },
        {
            name: "instagram",
            icon: instagramIcon,
        },
        {
            name: "youtube",
            icon: youtubeIcon,
        },
        {
            name: "tiktok",
            icon: tiktokIcon,
        },
    ];

const listWebsiteSystem: { name: string; img: StaticImageData }[] = [
    // {
    //     name: "nhan",
    //     img:
    // }
];

export default function FooterLayout() {
    return (
        <div className="footer-container">
            <div className="footer-top">
                <TopNavPublic background="var(--color-background-global)" />
            </div>
            <div className="footer-main">
                <div className="footer-content container-pub">
                    <div className="content-box-left">
                        <Link href={"/"} className="box-logo">
                            <Image height={10} width={200} src={logo} alt="logo" />
                        </Link>

                        <div className="box-register">
                            <h4 className="register-title">
                                Tham gia để nhận về tay thông tin ưu đãi và hữu ích từ MyKingDom
                            </h4>

                            <div className="box-form">
                                <input type="text" placeholder="Nhập email của bạn" />
                                <ButtonForm title="Đăng ký" />
                            </div>
                            <div className="error-message"></div>
                            <small className="noti-input">
                                *Bạn có thể hủy đăng ký bất kỳ lúc nào!
                            </small>
                        </div>
                    </div>
                    <div className="content-box-right">
                        <h1 className="title">Follow us</h1>
                        <div className="box-follow-us">
                            {listIconSocial.map((val) => (
                                <Image key={val.name} src={val.icon} alt={val.name} />
                            ))}
                        </div>
                        <h1 className="title system">Website cùng hệ thống</h1>
                        <div className="box-system-image">
                            <Image src={cleverLogo} alt="cleverLogo" />
                            <Image src={hobiverseLogo} alt="hobiverseLogo" />
                            <Image src={hobiverseLogo} alt="hobiverseLogo" />
                            <Image src={hobiverseLogo} alt="hobiverseLogo" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="line"></div>

            <div className="footer-main">
                <div className="footer-bottom container-pub">
                    <div className="footer-bottom-information">
                        <div className="info-left">
                            <div className="box-info-contract">
                                <h1 className="title">Thông tin liên hệ</h1>
                                <ul className="list-contract">
                                    <li className="list-contract-item">
                                        <span className="item-icon">
                                            <LiveIcon />
                                        </span>
                                        <span className="item-text">
                                            33-35 đường số D4, khu Đô thị mới Him Lam, Phường Tân
                                            Hưng, Quận 7, TP. Hồ Chí Minh
                                        </span>
                                    </li>

                                    <li className="list-contract-item">
                                        <span className="item-icon">
                                            <PhoneIcon />
                                        </span>
                                        <Link href={`tel:0787584517`} className="item-text">
                                            19001208
                                        </Link>
                                    </li>

                                    <li className="list-contract-item">
                                        <span className="item-icon">
                                            <EmailIcon />
                                        </span>
                                        <Link
                                            href={`mailto:huynhthanhnhan632004@gmail.com`}
                                            className="item-text"
                                        >
                                            hotro@mykingdom.com.vn
                                        </Link>
                                    </li>

                                    <li className="list-contract-item">
                                        <span className="item-icon">
                                            <CalendarIcon />
                                        </span>
                                        <Link
                                            href={`mailto:huynhthanhnhan632004@gmail.com`}
                                            className="item-text"
                                        >
                                            Thứ 2 - Thứ 7 * 8:00 - 17:00
                                        </Link>
                                    </li>

                                    <li className="list-contract-item">
                                        <span className="item-icon">
                                            <CalendarIcon />
                                        </span>
                                        <Link
                                            href={`mailto:huynhthanhnhan632004@gmail.com`}
                                            className="item-text"
                                        >
                                            Chủ nhật * 8:00 - 12:00
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="box-clause">
                                <h1 className="title">Điều khoản và chính sách</h1>
                                <ul className="list-contract">
                                    <li className="list-clause-item">
                                        <span className="clause-text">Chính sách giao hàng</span>
                                    </li>

                                    <li className="list-clause-item">
                                        <span className="clause-text">Chính sách bảo mật</span>
                                    </li>

                                    <li className="list-clause-item">
                                        <span className="clause-text">
                                            Chính sách bảo hành và đổi trả hàng hóa
                                        </span>
                                    </li>
                                    <li className="list-clause-item">
                                        <span className="clause-text">Chính sách thanh toán</span>
                                    </li>
                                    <li className="list-clause-item">
                                        <span className="clause-text">
                                            Điều kiện & Điều khoản thành viên
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="info-right">
                            <h1 className="title">Hệ thống cửa hàng</h1>
                            <Image src={hethongcuahang} alt="hethongcuahang" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
