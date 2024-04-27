import { getToken } from "@/lib";
import axios from "axios";

import {
  AuthApiApi,
  CategoryApiApi,
  CustomerApiApi,
  FeaturedGroupsApiApi,
  OrderApiApi,
  ProductApiApi,
  StaffApiApi,
  UserApiApi,
  WorkspaceTableApiApi,
} from "./client";

export const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_APP_DEV_API_URL
  : import.meta.env.VITE_APP_LOCAL_API_URL;

const globalAxios = axios.create({
  baseURL: baseURL,
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

export const AuthAPI = new AuthApiApi(undefined, baseURL, globalAxios);

export const UserAPI = new UserApiApi(undefined, baseURL, globalAxios);

export const CustomerAPI = new CustomerApiApi(undefined, baseURL, globalAxios);

export const StaffAPI = new StaffApiApi(undefined, baseURL, globalAxios);

export const CategoryAPI = new CategoryApiApi(undefined, baseURL, globalAxios);

export const ProductAPI = new ProductApiApi(undefined, baseURL, globalAxios);

export const FeaturedGroupsAPI = new FeaturedGroupsApiApi(
  undefined,
  baseURL,
  globalAxios,
);

export const TablesAPI = new WorkspaceTableApiApi(
  undefined,
  baseURL,
  globalAxios,
);

export const OrdersAPI = new OrderApiApi(undefined, baseURL, globalAxios);
