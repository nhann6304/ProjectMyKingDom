"use client";

import {
  FolderIcon,
  ShopIcon,
  TruckShipIcon,
} from "@/app/assets/common/icon-public/svg/top-nav/IconTopNav";
import Slider, { Settings } from "react-slick";
import styled from "styled-components";

//
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

const TopNavContainer = styled.div`
  width: 100%;
  height: 4rem;
  background-color: var(--color-blue-global);

  .item-parent {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    margin: 0 auto;
    align-items: center;

    .item-child {
      display: flex !important;
      color: white;
      align-items: center !important;
      justify-content: center;

      .child-icon {
        margin-right: 8px;
      }

      .child-text {
        font-size: 1.4rem;
        font-weight: 700;
      }
    }

    .slider-carousel {
      width: 100%;

      button {
        margin: 0 2.2rem;
        z-index: 1;
      }
    }

    .slick-arrow {
      .slick-next {
        display: none !important;
      }
    }

    .item-child {
      @media screen and (max-width: 480px) {
        .child-icon {
          svg {
            height: 2rem !important;
            width: 2rem !important;
          }
          margin-right: 8px;
        }
        .child-text {
          font-size: 1.3rem;
        }
      }
    }
  }
`;

export default function TopNavPublic() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Kiểm tra kích thước màn hình
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Cập nhật trạng thái ngay lần đầu
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings: Settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  return (
    <TopNavContainer>
      <div className="item-parent container-pub">
        {isMobile ? (
          <Slider className="slider-carousel" {...settings}>
            <div className="item-child">
              <span className="child-icon">
                <TruckShipIcon />
              </span>
              <span className="child-text">Miễn phí giao hàng đơn từ 500k</span>
            </div>
            <div className="item-child">
              <span className="child-icon">
                <FolderIcon />
              </span>
              <span className="child-text">Giao hàng hỏa tốc 4 tiếng</span>
            </div>
            <div className="item-child">
              <span className="child-icon">
                <ShopIcon />
              </span>
              <span className="child-text">Hệ thống 207 cửa hàng</span>
            </div>
          </Slider>
        ) : (
          <>
            <div className="item-child">
              <span className="child-icon">
                <ShopIcon />
              </span>
              <span className="child-text">Hệ thống 207 cửa hàng</span>
            </div>
            <div className="item-child">
              <span className="child-icon">
                <ShopIcon />
              </span>
              <span className="child-text">Hệ thống 208 cửa hàng</span>
            </div>
            <div className="item-child">
              <span className="child-icon">
                <ShopIcon />
              </span>
              <span className="child-text">Hệ thống 209 cửa hàng</span>
            </div>
          </>
        )}
      </div>
    </TopNavContainer>
  );
}
