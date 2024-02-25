import axios from "axios";
import { AuthApiApi } from "./client";
import { getAuthCookie } from "@/lib/utils";

const globalAxios = axios.create({
	baseURL: import.meta.env.VITE_APP_DEV_API_URL,
	headers: {
		"accept-language": "en",
	},
});

globalAxios.interceptors.request.use(
	async (config) => {
		const token = getAuthCookie();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		// Do something with request error
		return Promise.reject(error);
	},
);

// Response interceptor for API calls
globalAxios.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 403 && !originalRequest._retry) {
			// clear token and redirect to login page
			window.location.href = "/login";
			originalRequest._retry = true;
			axios.defaults.headers.common.Authorization = "Bearer "; // + access_token;
			return globalAxios(originalRequest);
		}
		return Promise.reject(error);
	},
);

export const AuthAPI = new AuthApiApi(
	undefined,
	import.meta.env.VITE_APP_DEV_API_URL,
	globalAxios,
);
