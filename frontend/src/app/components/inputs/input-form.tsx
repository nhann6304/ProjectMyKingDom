"use client";

import styled from "styled-components";

export default function InputForm() {
    const InputContainer = styled.div`
    display: flex;
    gap: 8px;
    flex-direction: column;
    .box-input {
      width: 100%;
      padding: 0 8px;
      font-weight: 500;
      overflow: hidden;
      background-color: #e8f0fe;
      border: 2px solid #8f8f8f;
      border-radius: 1.6rem;
      input {
        padding: 0 5px;
        font-size: 1.4rem;
        height: 5rem;
        width: 100%;
        border: none;
        outline: none;
        background-color: #e8f0fe;

        &:focus {
          outline: none;
        }
      }
    }
  `;

    return (
        <InputContainer>
            <label htmlFor="">Email</label>
            <div className="box-input">
                <input type="text" />
            </div>
        </InputContainer>
    );
}
