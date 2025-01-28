"use client";

import { Fragment, useState } from "react";
import { FieldValues, Controller, Control, FieldErrors } from "react-hook-form";
import styled from "styled-components";

// Icon
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Select } from "antd";
import { CONST_GENDER_VALUES } from "@/constants/values.constant";

// Định nghĩa kiểu cho loại input
type TTypeInput = "number" | "password" | "text" | "checkbox" | "select";

interface IProdsInputField<T> {
  name: keyof T;
  type?: TTypeInput;
  label: string;
  placeholder?: string;
  background?: string;
  required?: boolean;
  control: Control<any>;
  errors: FieldErrors<any>;
  extraValidate?: (val: string) => string | true;
}

// Styled-component cho InputContainer
const InputContainer = styled.div<{ background?: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;

  .box-label {
    display: flex;
    align-items: center;
    gap: 3px;

    label {
      font-size: 1.4rem;
      font-weight: 700;
      color: #041675;
    }

    span {
      color: red;
      font-size: 1.6rem;
    }
  }

  .box-input {
    margin-top: 5px;
    width: 100%;
    padding: 0 8px;
    font-weight: 500;
    overflow: hidden;
    background-color: ${({ background }) => background || "white"};
    border: 2px solid #8f8f8f;
    border-radius: 1.6rem;

    input {
      padding: 0 5px;
      font-size: 1.4rem;
      height: 5rem;
      width: 100%;
      border: none;
      outline: none;
      background-color: ${({ background }) => background || "white"};

      &:focus {
        outline: none;
      }
    }

    .selected-item {
      width: 100%;
      height: 5rem;

      .ant-select-selector {
        border: none;
        outline: none;
        padding: 0 8px;
      }
    }
    /* Xóa viền khi focus hoặc active */
    .selected-item.ant-select-focused .ant-select-selector,
    .selected-item .ant-select-selector:focus,
    .selected-item .ant-select-selector:active {
      border-color: transparent !important;
      box-shadow: none !important;
    }

    .selected-item .ant-select-selector:hover {
      border-color: transparent !important;
    }
  }
`;

// Styled-component cho lỗi
const ErrorValidate = styled.div`
  margin-top: 2px;

  span {
    font-size: 1.2rem;
    color: red;
    font-weight: 300;
  }
`;

// Component InputForm
export function InputForm<T extends FieldValues>({
  name,
  label,
  type,
  placeholder,
  required,
  control,
  errors,
  background,
  extraValidate,
}: IProdsInputField<T>) {
  const [hiddenEye, setHiddenEye] = useState<boolean>(true);

  const handleEyePassword = () => {
    setHiddenEye(!hiddenEye);
  };

  const genderOptions = Object.entries(CONST_GENDER_VALUES).map(
    ([value, label]) => ({
      value,
      label,
    })
  );

  return (
    <>
      <InputContainer background={background}>
        <div className="box-label">
          <label htmlFor={name.toString()}>{label}</label>
          {required && <span>*</span>}
        </div>
        <div className="box-input">
          <Controller
            name={`${name.toString()}`}
            control={control}
            rules={{
              required,
              validate: extraValidate,
            }}
            render={({ field }) => (
              <div className="flex items-center justify-between w-full">
                {type !== "select" ? (
                  <input
                    id={name.toString()}
                    type={
                      type === "password" && !hiddenEye
                        ? "text"
                        : type || "text"
                    }
                    placeholder={placeholder}
                    {...field}
                  />
                ) : (
                  <Select
                    className="selected-item"
                    placeholder="Chọn"
                    {...field}
                    onChange={(value) => field.onChange(value)}
                    options={genderOptions}
                  />
                )}

                {type === "password" && (
                  <span className="pr-3">
                    {hiddenEye ? (
                      <AiFillEyeInvisible
                        onClick={handleEyePassword}
                        className="cursor-pointer"
                        size={26}
                      />
                    ) : (
                      <AiFillEye
                        onClick={handleEyePassword}
                        className="cursor-pointer"
                        size={26}
                      />
                    )}
                  </span>
                )}
              </div>
            )}
          />
        </div>

        <ErrorValidate>
          {errors?.[name as string]?.type === "required" && (
            <span>Vui lòng nhập thông tin</span>
          )}

          {errors?.[name as string] && (
            <span>{errors?.[name]?.message as string}</span>
          )}
        </ErrorValidate>

      </InputContainer>

    </>
  );
}
