"use client";

import Image, { StaticImageData } from "next/image";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa6";
import cate_name from "@/assets/common/icon-public/jpg/home-page/cateNam.webp";
import Link from "next/link";

interface IProps {
  title: string,
  link: string,
  img: StaticImageData
}

const CardContainer = styled.div`
  width: 100%;
  cursor: pointer;
  position: relative;

  .box-header {
    width: 100%;
    border-radius: 1.2rem;
    overflow: hidden;
    display: inline-block;
    position: relative;

    img {
      width: 100%;
      transition: transform 0.3s ease-in-out;
      object-fit: cover;
    }
  }

  .arrow-icon {
    position: absolute;
    bottom: 5%;
    right: 5%;
    height: 3rem;
    width: 3rem;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-background-global);
    font-size: 1.8rem;
    transition: all 0.3s ease-in-out;
  }

  &:hover .box-header img {
    transform: scale(1.1);
  }

  .arrow-icon:hover {
    background-color: var(--color-background-global);
    transform: scale(1.15);
    color: white;
  }

  .box-footer {
    margin-top: 1.6rem;
    text-align: center;
    font-size: 2.4rem;
    font-weight: 700;
    text-transform: capitalize;
  }

  @media (max-width: 1024px) {
    .arrow-icon {
      height: 2.5rem;
      width: 2.5rem;
      font-size: 1.6rem;
    }

    .box-footer {
      font-size: 2rem;
    }
  }

  @media (max-width: 768px) {
    .arrow-icon {
      height: 2rem;
      width: 2rem;
      font-size: 1.4rem;
    }

    .box-footer {
      font-size: 1.8rem;
      margin-top: 1.2rem;
    }
  }

  @media (max-width: 425px) {
    .arrow-icon {
      height: 1.8rem;
      width: 1.8rem;
      font-size: 1.2rem;
    }

    .box-footer {
      font-size: 1.6rem;
      margin-top: 1rem;
    }
  }
`;


export default function CardHotCate({ img, link = "#", title }: IProps) {
  return (
    <CardContainer>
      <Link href={link} >
        <div className="box-header">
          <Image src={img} alt="img_new" />
          <span className="arrow-icon">
            <FaArrowRight size={14} />
          </span>
        </div>

        <div className="box-footer">
          <h1>{title}</h1>
        </div>
      </Link>
    </CardContainer>
  );
}
