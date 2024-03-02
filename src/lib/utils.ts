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

export function setAuthCookie(token: string) {
	document.cookie = `token=${token};`;
}

export function clearAuthCookie() {
	document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

export function getAuthCookie() {
	return document.cookie
		.split(";")
		.find((c) => c.includes("token="))
		?.split("=")[1];
}

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
