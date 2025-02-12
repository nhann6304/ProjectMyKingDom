"use client";
import "./style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { AiFillAlert } from "react-icons/ai";
import { useRef } from "react";
import ButtonForm from "@/components/buttons/ButtonForm";
import hinh from "@/assets/models/carousel/carousel-home/carosel.1.webp";
import ButtonCommon from "@/components/buttons/ButtonCommon";

export default function HomePageLayout() {
    const sliderRef = useRef<Slider | null>(null); // Tạo ref cho Slider

    // Component mũi tên trái
    const PrevArrow = () => (
        <div className="custom-prev-arrow" onClick={() => sliderRef.current?.slickPrev()}>
            <IoIosArrowForward size={30} />
        </div>
    );

    // Component mũi tên phải
    const NextArrow = () => (
        <div className="custom-next-arrow" onClick={() => sliderRef.current?.slickNext()}>
            <IoIosArrowBack size={30} />
        </div>
    );

    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Ẩn mũi tên mặc định
    };

    return (
        <div className="home-container">
            {/* carousel */}
            <div className="box-carousel">
                <Slider ref={sliderRef} {...settings}>
                    <div>
                        <Image src={hinh} alt="hinh" />
                    </div>
                    <div>
                        <Image src={hinh} alt="hinh" />
                    </div>
                    <div>
                        <Image src={hinh} alt="hinh" />
                    </div>
                    <div>
                        <Image src={hinh} alt="hinh" />
                    </div>
                </Slider>
                {/* Điều khiển bằng ref */}
                <PrevArrow />
                <NextArrow />
            </div>
            {/* Button option */}
            <div className="box-btn-option ">
                <ButtonCommon title="Tất cả" hoverBg={false} link="facebook.com" />
                <ButtonCommon title="Hàng mới" />
                <ButtonCommon title="Sự kiện" />
                <ButtonCommon title="Giảm giá" />
            </div>
            {/* Product box */}
            <div className="box-product-item">
                <h1 className="product-item-title">Ưu Đãi Độc Quyền Online Từ 08-14/2</h1>
                <div className="product-btn-more">
                    <ButtonCommon title="Xem thêm" icon hoverBg={false} />
                </div>
            </div>
            {/* Carousel Product */}
        </div>
    );
}
