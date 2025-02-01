import styled, { keyframes } from "styled-components";

const rotate0925 = keyframes`
  0% {
    transform: scale(1) rotate(360deg);
  }
  50% {
    transform: scale(0.8) rotate(-360deg);
  }
  100% {
    transform: scale(1) rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1); /* Hiệu ứng mờ */
    backdrop-filter: blur(1px);
    z-index: -1;
  }

  .loader {
    width: 60px;
    height: 60px;
    border: 10px solid #162534;
    border-top-color: #4bc8eb;
    border-bottom-color: #f13a8f;
    border-radius: 50%;
    animation: ${rotate0925} 5s linear infinite;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .loader-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 10px solid transparent;
      border-top-color: #36f372;
      border-bottom-color: var(--color-background-global);
      animation: ${rotate0925} 2.5s linear infinite;
    }
  }
`;

export default function Loading() {
    return (
        <LoaderWrapper>
            <div className="loader">
                <div className="loader-inner"></div>
            </div>
        </LoaderWrapper>
    );
}
