import { DEBUG } from "@/config/app";

export type ResponseData<T, E> = {
  statusCode: number;
  statusMessage: string;
  success: boolean;
  message?: string | string[] | E;
  data?: T;
};

export const HTTP_STATUS_CODE = {
  200: "OK",
  201: "CREATED",
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  402: "NEED_PAYMENT",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  409: "CONFLICT",
  422: "UNPROCESSABLE_ENTITY",
  429: "TOO_MANY_REQUEST",
  500: "INTERNAL_SERVER_ERROR",
};
export type STATUS_CODE_TYPE = keyof typeof HTTP_STATUS_CODE;
export type ErrorMessage<T> = {
  key: keyof T;
  message: string;
};

export const getStatusCode = (code: number) => {
  return HTTP_STATUS_CODE[code as STATUS_CODE_TYPE];
};
export const getStatusMessage = (code: STATUS_CODE_TYPE) => {
  return HTTP_STATUS_CODE[code].split("_").join(" ").trim();
};

type ResponseProps<T, E> = {
  code: STATUS_CODE_TYPE;
  message?: string | E;
  data?: T;
};
export const responseSuccess = <T, E>(
  props: ResponseProps<T, E>
): ResponseData<T, E> => ({
  statusCode: props.code,
  statusMessage: getStatusCode(props.code),
  message: props.message || "Successfull",
  success: true,
  data: props.data,
});
export const responseError = <T, E>(
  props: ResponseProps<T, E>
): ResponseData<T, E> => ({
  statusCode: props.code,
  statusMessage: getStatusCode(props.code),
  message: props.message || getStatusMessage(props.code),
  success: false,
});

export const stringToBoolean = (value: string) => {
  return value === "true";
};

export const randomNumbers = (min: number, max: number): number => {
  const random = Math.floor(Math.random() * max);
  if (random >= min && random <= max) return random;
  return randomNumbers(min, max);
};
export const debugError = (error: any) => {
  DEBUG ? console.log({ error }) : null;
};
