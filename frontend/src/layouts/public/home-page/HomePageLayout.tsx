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
//
import img_all from "@/assets/common/icon-public/jpg/prod_all.webp";
import img_new from "@/assets/common/icon-public/jpg/prod_new.webp";
import img_present from "@/assets/common/icon-public/jpg/prod_present.webp";
import img_sale from "@/assets/common/icon-public/jpg/prod_sale.webp";
//
import cate_name from "@/assets/common/icon-public/jpg/home-page/cateNam.webp";

import Link from "next/link";
import CardHotCate from "@/components/cards/CardHotCate";
export default function HomePageLayout() {
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: false,
                },
            },
        ],
    };

    const settingsProduct: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                },
            },

            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 2,
                },
            },

            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="home-container">
            <div className="section-container container-pub">
                <div className="box-carousel">
                    <CarouselHome scroll={false} settings={settings}>
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
                    </CarouselHome>
                </div>
                {/* --------------- */}
                <div className="box-btn-option">
                    <Link href={"#"} className="btn-option">
                        <Image src={img_all} alt="hinh" />
                    </Link>

                    <Link href={"#"} className="btn-option">
                        <Image src={img_new} alt="hinh" />
                    </Link>

                    <Link href={"#"} className="btn-option">
                        <Image src={img_present} alt="hinh" />
                    </Link>

                    <Link href={"#"} className="btn-option">
                        <Image src={img_sale} alt="hinh" />
                    </Link>
                </div>
                {/* --------------- */}
                <div className="box-product-item">
                    <h1 className="product-item-title">Ưu Đãi Độc Quyền Website</h1>
                    <div className="product-btn-more">
                        <ButtonCommon background title="Xem thêm" icon hoverBg={false} />
                    </div>
                    {/* Carousel Product */}

                    <CarouselHome
                        scroll
                        className="custom-carousel"
                        settings={settingsProduct}
                    >
                        <div className="card-item">
                            <CardProduct />
                        </div>

                        <div className="card-item">
                            <CardProduct />
                        </div>

                        <div className="card-item">
                            <CardProduct />
                        </div>

                        <div className="card-item">
                            <CardProduct />
                        </div>
                    </CarouselHome>
                </div>
                {/* --------------- */}
                <div className="box-category-hot">
                    <h1 className="cate-item-title">Danh mục HOT</h1>

                    <div className="list-cate">
                        <CardHotCate img={cate_name} link="#" title="Đồ chơi bé trai" />
                        <CardHotCate img={cate_name} link="#" title="Đồ chơi bé gái" />
                        <CardHotCate img={cate_name} link="#" title="Hot Wheels" />
                        <CardHotCate img={cate_name} link="#" title="Balo, Túi & Vali" />
                    </div>
                </div>

                {/* --------------- */}
                <div className="box-product-item ">
                    <h1 className="product-item-title">Hàng mới về - bé thích mê</h1>
                    <div className="product-btn-more">
                        <ButtonCommon background title="Xem thêm" icon hoverBg={false} />
                    </div>
                    {/* Carousel Product */}

                    <CarouselHome
                        scroll
                        className="custom-carousel"
                        settings={settingsProduct}
                    >
                        <div className="card-item">
                            <CardProduct />
                        </div>

                        <div className="card-item">
                            <CardProduct />
                        </div>

                        <div className="card-item">
                            <CardProduct />
                        </div>

                        <div className="card-item">
                            <CardProduct />
                        </div>
                    </CarouselHome>
                </div>
                {/* -------Update sau-------- */}
                {/* <div className="box-age-play">
                    <h1 className="age-play-title">Độ tuổi</h1>
                </div> */}
                {/* --------------- */}


            </div>
        </div>
    );
}
