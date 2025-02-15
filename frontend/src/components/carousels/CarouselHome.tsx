"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useRef } from "react";
import Slider, { Settings } from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import minionIcon from "../../assets/common/icon-public/svg/icon/minion.svg";
interface IProps {
  settings: Settings;
  children: React.ReactNode;
  scroll: boolean;
  className?: string; // Thêm props className
}

export default function CarouselHome({
  settings,
  children,
  scroll,
  className,
}: IProps) {
  const sliderRef = useRef<Slider | null>(null);

  const CarouselContainer = styled.div`
    position: relative;
    .slick-slider {
      padding: 0 4rem;
    }

    .slick-list {
      /* border-radius: 2rem; */
      overflow: hidden;
    }

    .slick-dots {
      li {
        margin: 0 !important;

        button {
          &::before {
            font-size: 1rem;
            color: var(--color-background-global);
          }
        }
      }
    }

    .scroll-container {
      padding: 4rem 0;
      span {
        margin: 0 auto;
        display: block;
        border-radius: 1rem;
        width: 45vw;
        height: 8px;
        background-color: var(--color-background-global);
      }

      .minion-image {
        position: absolute;
        right: 0;
        left: 25%;
        height: 7rem;
        width: 7rem;
        object-fit: cover;
        border-radius: 50%;
        cursor: pointer;
        margin-top: -45px;
        z-index: 2;
      }
    }

    .custom-prev-arrow,
    .custom-next-arrow {
      border: 3px solid var(--color-background-global);
      border-radius: 50%;
      position: absolute;
      top: 50%;
      z-index: 1;
      cursor: pointer;
      color: var(--color-background-global);
      padding: 5px;
      transition: background 0.3s;
    }

    .custom-prev-arrow {
      left: 100%;
    }

    .custom-next-arrow {
      right: 100%;
    }

    .slick-slide {
      display: flex;
      justify-content: center;

      img {
        width: 100vw;
      }
    }
  `;

  // Component mũi tên trái
  const PrevArrow = () => (
    <div
      className="custom-prev-arrow"
      onClick={() => sliderRef.current?.slickPrev()}
    >
      <IoIosArrowForward size={30} />
    </div>
  );

  // Component mũi tên phải
  const NextArrow = () => (
    <div
      className="custom-next-arrow"
      onClick={() => sliderRef.current?.slickNext()}
    >
      <IoIosArrowBack size={30} />
    </div>
  );

  return (
    <CarouselContainer className={className}>
      <Slider ref={sliderRef} {...settings}>
        {children}
      </Slider>
      {/* Điều khiển bằng ref */}
      <PrevArrow />
      <NextArrow />
      {scroll && (
        <div className="scroll-container">
          <span></span>
          <Image
            src={minionIcon}
            alt="Minion"
            width={48}
            height={48}
            className="minion-image"
          />
        </div>
      )}
    </CarouselContainer>
  );
}
