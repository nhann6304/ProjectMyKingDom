"use client";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import styled from "styled-components";



// 👇 Sửa lại như vầy để không truyền prop vào DOM
const ScrollButton = styled.button.withConfig({
    shouldForwardProp: (prop) => prop !== "opacityLevel",
}) <{ opacityLevel: number }>`
  position: fixed;
  bottom: 6rem;
  right: 3rem;
  width: 5.5rem;
  height: 5.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-background-global);
  color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease-in-out, transform 0.2s;
  opacity: ${(props) => props.opacityLevel};
  pointer-events: ${(props) => (props.opacityLevel > 0 ? "auto" : "none")};
  cursor: pointer;

  .box-icon{
    border: 2px solid white;
    padding: 6px;
    border-radius: 50%;
  }

  &:hover {
    opacity: 1 !important;
    /* background-color: #2563eb; */
    transform: scale(1.1);
  }
`;

const ScrollTopButton = () => {
    const [opacityLevel, setOpacityLevel] = useState(0);

    useEffect(() => {
        const toggleVisibility = () => {
            const scrollY = window.scrollY;

            if (scrollY <= 100) {
                setOpacityLevel(0); // Ẩn hoàn toàn khi từ 0 -> 100px
            } else if (scrollY > 100 && scrollY <= 200) {
                const calculatedOpacity = (scrollY - 100) / 100; // 0 -> 1
                setOpacityLevel(calculatedOpacity);
            } else {
                setOpacityLevel(0.3); // Sau 200px: mờ
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <ScrollButton
            opacityLevel={opacityLevel}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
            <span className="box-icon">
                <FaArrowUp size={18} />
            </span>
        </ScrollButton>
    );
};

export default ScrollTopButton;
