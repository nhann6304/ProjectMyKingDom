"use client";

import { Fragment, useState } from "react";
import { FieldValues, Controller, Control, FieldErrors } from "react-hook-form";
import styled from "styled-components";

type TTypeInput = "number" | "password" | "text" | "checkbox";

//icon
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

interface IProdsInputField<T> {
  name: keyof T;
  type?: TTypeInput;
  label: string;
  placeholder?: string;
  required?: boolean;
  control: Control<any>;
  errors: FieldErrors<any>;
  extraValidate?: (val: string) => string | true;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  .box-label {
    display: flex;
    align-items: center;
    gap: 3px;
    label {
      font-size: 1.2rem;
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

const ErrorValidate = styled.div`
  margin-top: 2px;
  span {
    font-size: 1.2rem;
    color: red;
    font-weight: 300;
  }
`;

export function InputForm<T extends FieldValues>({
  name,
  label,
  type,
  placeholder,
  required,
  control,
  errors,
  extraValidate,
}: IProdsInputField<T>) {
  const [hiddenEye, setHiddenEye] = useState<boolean>(true);

  const handleEyePassword = () => {
    setHiddenEye(!hiddenEye);
  };
  return (
    <>
      <InputContainer>
        <div className="box-label">
          <label htmlFor={""}>{label}</label>
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
              <div className="flex items-center">
                <input
                  type={
                    type === "password" && !hiddenEye ? "text" : type || "text"
                  }
                  placeholder={placeholder}
                  {...field}
                />

                {type === "password" && (
                  <span className="pr-3">
                    {hiddenEye ? (
                      // Ẩn
                      <AiFillEyeInvisible
                        onClick={handleEyePassword}
                        className="cursor-pointer"
                        size={26}
                      />
                    ) : (
                      // Hiện
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
      </InputContainer>
      <ErrorValidate>
        {errors?.[name as string]?.type === "required" && (
          <span>Vui lòng nhập thông tin</span>
        )}

        {errors?.[name as string] && (
          <span>{errors?.[name]?.message as string}</span>
        )}
      </ErrorValidate>
    </>
  );
}
