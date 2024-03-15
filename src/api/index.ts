import { getToken } from "@/lib";
import axios from "axios";
import {
	AuthApiApi,
	CategoryApiApi,
	CustomerApiApi,
	StaffApiApi,
	UserApiApi,
} from "./client";

const globalAxios = axios.create({
	baseURL: import.meta.env.VITE_APP_DEV_API_URL,
	headers: {
		"accept-language": "en",
	},
});

globalAxios.interceptors.request.use(
	async (config) => {
		const token = getToken();
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
			// do something
		}
		return Promise.reject(error);
	},
);

export const AuthAPI = new AuthApiApi(
	undefined,
	import.meta.env.VITE_APP_DEV_API_URL,
	globalAxios,
);

export const UserAPI = new UserApiApi(
	undefined,
	import.meta.env.VITE_APP_DEV_API_URL,
	globalAxios,
);

export const CustomerAPI = new CustomerApiApi(
	undefined,
	import.meta.env.VITE_APP_DEV_API_URL,
	globalAxios,
);

export const StaffAPI = new StaffApiApi(
	undefined,
	import.meta.env.VITE_APP_DEV_API_URL,
	globalAxios,
);

export const CategoryAPI = new CategoryApiApi(
	undefined,
	import.meta.env.VITE_APP_DEV_API_URL,
	globalAxios,
);
