"use client";
import "./style.scss";
import hinh from "@/assets/models/carousel/carousel-home/carosel.1.webp";
import ButtonCommon from "@/components/buttons/ButtonCommon";
import CardProduct from "@/components/cards/CardProduct";
import CarouselHome from "@/components/carousels/CarouselHome";
import Image from "next/image";
import { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function HomePageLayout() {
    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const settingsProduct: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        // <div className="home-container">
        //     {/* carousel */}
        //     <div className="box-carousel">
        //         <CarouselHome scroll={false} settings={settings}>
        //             <div>
        //                 <Image src={hinh} alt="hinh" />
        //             </div>
        //             <div>
        //                 <Image src={hinh} alt="hinh" />
        //             </div>
        //             <div>
        //                 <Image src={hinh} alt="hinh" />
        //             </div>
        //             <div>
        //                 <Image src={hinh} alt="hinh" />
        //             </div>
        //         </CarouselHome>
        //     </div>
        //     {/* Button option */}
        //     <div className="box-btn-option ">
        //         <ButtonCommon title="Tất cả" hoverBg={false} link="facebook.com" />
        //         <ButtonCommon title="Hàng mới" />
        //         <ButtonCommon title="Sự kiện" />
        //         <ButtonCommon title="Giảm giá" />
        //     </div>
        //     {/* Product box */}
        //     <div className="box-product-item">
        //         <h1 className="product-item-title">
        //             Ưu Đãi Độc Quyền Online Từ 08-14/2
        //         </h1>
        //         <div className="product-btn-more">
        //             <ButtonCommon title="Xem thêm" icon hoverBg={false} />
        //         </div>
        //         {/* Carousel Product */}

        //         <CarouselHome
        //             scroll
        //             className="custom-carousel"
        //             settings={settingsProduct}
        //         >
        //             <div className="card-item">
        //                 <CardProduct />
        //             </div>

        //             <div className="card-item">
        //                 <CardProduct />
        //             </div>

        //             <div className="card-item">
        //                 <CardProduct />
        //             </div>

        //             <div className="card-item">
        //                 <CardProduct />
        //             </div>
        //         </CarouselHome>
        //     </div>
        // </div>

        <div className="home-container">
            <div className="section-container">
                12323
            </div>
        </div>
    );
}
