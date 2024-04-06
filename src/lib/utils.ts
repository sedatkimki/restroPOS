import { AuthAPI } from "@/api";
import { ResponseMessage } from "@/api/client";
import debouncePromise from "awesome-debounce-promise";
import axios, { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSubdomain(url: string): string {
  const hostname = new URL(url).hostname;
  const subdomain = hostname.split(".").filter((part) => part !== "www")[0];
  return subdomain;
}

export function redirectToWorkspace(subdomain: string) {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  url.hostname = `${subdomain}.${url.hostname}`;
  url.pathname = "/";
  window.location.href = url.href;
}

export function redirectToRoot() {
  if (import.meta.env.PROD) {
    window.location.href = import.meta.env.VITE_APP_BASE_URL;
  } else {
    window.location.href = import.meta.env.VITE_APP_DEV_URL;
  }
}

export const setToken = (token: string, expiryDays: number): void => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiryDays);
  const expiryString = expiryDate.toUTCString();
  document.cookie = `token=${token}; expires=${expiryString}; path=/`;
};

export const clearToken = (): void => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
};

export const getToken = (): string | null => {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("token=")) {
      return cookie.substring(6);
    }
  }
  return null;
};

export const isDomainValid = debouncePromise(async (value, callBack) => {
  try {
    const response = await AuthAPI.workspaceValid(value);
    callBack(response.data);
  } catch (error) {
    if (isAxiosError<ResponseMessage>(error)) {
      callBack(error.response?.data.message);
    }
  }
}, 500);

export function isAxiosError<ResponseType>(
  error: unknown,
): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error);
}

export const normalizeValue = (value: number, min: number, max: number) => {
  return ((value - min) / (max - min)) * 100;
};
