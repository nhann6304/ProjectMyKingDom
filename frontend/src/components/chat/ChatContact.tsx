"use client";

import styled from "styled-components";
import { MdChatBubbleOutline } from "react-icons/md";
import Image from "next/image";
import logo from "@/assets/common/logo/logo-chat.webp";
import { BiSolidLike } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { useState } from "react";
import { MdOutlineAttachment } from "react-icons/md";
import { FaRegFaceSmile } from "react-icons/fa6";
import { MdSend } from "react-icons/md";
import { IoMdRemove } from "react-icons/io";
import TextArea from "antd/es/input/TextArea";
const CustomTextArea = styled(TextArea)`
  width: 100%;
  font-size: 14px;
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
  resize: none;
  background: white;

  &:hover,
  &:focus,
  &:active {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
`;

const ChatClientContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 3rem;
  z-index: 3;
  height: auto;

  header {
    position: relative;

    .header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f04e47;
      padding: 5px 1rem;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;

      .title-name {
        width: 100%;
        font-size: 1.4rem;
        color: white;
        font-weight: 600;
        padding: 2px 0;
      }

      .box-icon {
        cursor: pointer;
      }
    }

    .header-bottom {
      justify-content: space-between;
      align-items: center;
      background-color: white;
      padding: 1rem;
      padding-bottom: 1.2rem;
      border-bottom: 1px solid black;

      .bottom-left {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.2rem;
        font-weight: 600;

        .logo {
          position: absolute;
          object-fit: cover;
          top: 20%;
          height: 5rem;
          width: 5rem;
          border-radius: 5px;
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
            rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        }

        .bottom-title {
          margin-left: 6rem;
          font-size: 1.4rem;
          font-weight: 700;
        }
      }
    }
  }

  .chat-body {
    flex-direction: column;
    height: 40rem;
  }

  .chat-center {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    background: white;
    border-bottom: 1px solid red;
  }

  .chat-footer {
    background: white;
    display: flex;
    flex-direction: column;

    .area-chat {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: flex-start;
      width: 100%;
      padding: 1rem 8px;
      padding-top: 5px;
    }

    .chat-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .chat-text {
      display: flex;
      flex-direction: column;
    }

    .send-chat {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0.5rem;
      cursor: pointer;
    }

    .arena-setting {
      padding: 0.5rem 1rem;
      background-color: white;
      border-top: 1px solid blue;
    }
  }
`;

export default function ChatContact() {
  const [value, setValue] = useState("");
  const [openChat, setOpenChat] = useState<boolean>(true);

  return (
    <ChatClientContainer className={`${openChat ? "w-[20rem]" : "w-[30rem]"}`}>
      <header>
        <div className="header-top">
          <span
            className={`title-name ${openChat ? "text-left" : "text-center"}`}
          >
            Đang trò chuyện
          </span>
          <span className="box-icon">
            {openChat ? (
              <MdChatBubbleOutline
                onClick={() => setOpenChat(false)}
                color="white"
                size={24}
              />
            ) : (
              <IoMdRemove
                onClick={() => setOpenChat(true)}
                color="white"
                size={26}
              />
            )}
          </span>
        </div>
        <div className={`header-bottom ${openChat ? "hidden" : "flex"}`}>
          <div className="bottom-left">
            <Image className="logo" src={logo} alt="logo" />
            <span className="bottom-title">Vương quốc đồ chơi</span>
          </div>
          <div className="like-box">
            <BiSolidLike size={26} color="gray" />
          </div>
        </div>
      </header>

      <div className={`chat-body ${openChat ? "hidden" : "flex"}`}>
        <div className="chat-center">{/* Nội dung chat */}</div>

        <div className="chat-footer">
          <div className="area-chat">
            <div className="chat-option">
              <span>
                <MdOutlineAttachment size={22} color="gray" />
              </span>
              <span>
                <FaRegFaceSmile size={18} color="gray" />
              </span>
            </div>

            <div className="chat-text">
              <CustomTextArea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Nhập tin nhắn......"
                autoSize={{ minRows: 1, maxRows: 5 }}
              />
            </div>

            <div className="send-chat">
              <MdSend size={20} color="gray" />
            </div>
          </div>

          <div className="arena-setting">
            <FiSettings size={16} />
          </div>
        </div>
      </div>
    </ChatClientContainer>
  );
}
