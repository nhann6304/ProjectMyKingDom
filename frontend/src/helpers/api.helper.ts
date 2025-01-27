"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { IErrorResponse } from "../interfaces/common/IApi.interface";
import { CONST_METHODS } from "../constants/methods.constant";
import { CONST_VALUES } from "../constants/values.constant";

interface IOptions {
  url: string;
  options: RequestInit;
}

export const api = async <TypeResult>({
  url,
  options,
}: IOptions): Promise<TypeResult & IErrorResponse> => {
  let headers: HeadersInit;

  if (options.body instanceof FormData) {
    headers = {
      ...options.headers,
      Cookie: cookies().toString(),
    };
  } else {
    headers = {
      ...options.headers,
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    };
  }

  const dataOptions: RequestInit = {
    ...options,
    headers,
    credentials: "include",
  };

  let response = await fetch(url, dataOptions);

  let result: TypeResult & IErrorResponse = await response.json();

  if (
    options.method === CONST_METHODS.POST ||
    options.method === CONST_METHODS.PATCH ||
    options.method === CONST_METHODS.DELETE ||
    options.method === CONST_METHODS.PUT
  ) {
    if (result.statusCode == 406) {
      cookies().delete(CONST_VALUES.TOKEN);
      redirect("/auth/login");
    }
  }

  return result;
};
