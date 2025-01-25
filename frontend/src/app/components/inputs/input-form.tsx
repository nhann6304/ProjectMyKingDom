"use client";

import { Fragment } from "react";
import { FieldValues, Controller, Control, FieldErrors } from "react-hook-form";
import styled from "styled-components";

interface IProdsInputField<T> {
  name: keyof T;
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

    span{
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
  placeholder,
  required,
  control,
  errors,
  extraValidate,
}: IProdsInputField<T>) {
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
              <>
                <input placeholder={placeholder} {...field} />
              </>
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
