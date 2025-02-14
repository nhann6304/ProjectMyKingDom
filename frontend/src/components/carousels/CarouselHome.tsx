"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useRef } from "react";
import Slider, { Settings } from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface IProps {
  settings: Settings;
  children: React.ReactNode;
  className?: string; // Thêm props className
}

export default function CarouselHome({
  settings,
  children,
  className,
}: IProps) {
  const sliderRef = useRef<Slider | null>(null); // Tạo ref cho Slider

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
    </CarouselContainer>
  );
}
