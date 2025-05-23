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
const CarouselContainer = styled.div`
  position: relative;
  .slick-slider {
    padding: 0 4rem;
     @media screen and (max-width: 768px) {
         padding: 0 ;
    }
      @media screen and (max-width: 425px) {
         padding: 0  2rem;
    }
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;

    svg {
      width: 30px;
      height: 30px;
    }

    @media screen and (max-width: 1024px) {
      width: 40px;
      height: 40px;

      svg {
        width: 24px;
        height: 24px;
      }
    }

    @media screen and (max-width: 768px) {
      width: 35px;
      height: 35px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  .custom-prev-arrow {
    left: 100%;
    transform: translateX(-50%);
    @media screen and (max-width: 1440px) {
      left: 99%;
    }
    @media screen and (max-width: 1024px) {
      left: 98%;
    }
    @media screen and (max-width: 768px) {
      left: 97%;
    }
  }

  .custom-next-arrow {
    right: 100%;
    transform: translateX(50%);
     @media screen and (max-width: 1440px) {
      right: 99%;
    }
    @media screen and (max-width: 1024px) {
      right: 98%;
    }
    @media screen and (max-width: 768px) {
      right: 97%;
    }
  }

  .slick-slide {
    display: flex;
    justify-content: center;

    img {
      width: 100vw;
    }
  }
`;
export default function CarouselHome({
  settings,
  children,
  scroll,
  className,
}: IProps) {
  const sliderRef = useRef<Slider | null>(null);

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
    <>
      <CarouselContainer className={className}>
        <Slider ref={sliderRef} {...settings}>
          {children}
        </Slider>
        {/* Điều khiển bằng ref */}
        <PrevArrow />
        <NextArrow />
      </CarouselContainer>
    </>
  );
}
