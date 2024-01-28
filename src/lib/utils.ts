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
	window.location.href = url.href;
}

export function redirectToRoot() {
	if (import.meta.env.PROD) {
		window.location.href = import.meta.env.VITE_APP_BASE_URL;
	} else {
		window.location.href = import.meta.env.VITE_APP_DEV_URL;
	}
}
