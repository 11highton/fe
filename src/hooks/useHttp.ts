import axios, { type AxiosInstance } from 'axios';
import { type ZodType } from 'zod';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestConfig {
  url: string;
  method: HttpMethod;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface ApiResponse<T = any> {
  data?: T;
  timestamp: string;
  success: boolean;
  error?: {
    status: number;
    code: string;
    details?: any;
  };
}

export default class HttpService {
  private client: AxiosInstance;
  private static readonly DEFAULT_TIMEOUT = 600_000;

  constructor(
    baseURL = "/api",
    contentType: string = "application/json",
    responseType: "json" | "blob" | "arraybuffer" | "text" | "document" = "json"
  ) {
    this.client = axios.create({
      baseURL,
      timeout: HttpService.DEFAULT_TIMEOUT,
      headers: { 'Content-Type': contentType },
      responseType,
      withCredentials: true,
    });
  }

  async request<T = any>(config: RequestConfig, resSchema?: ZodType<T>): Promise<ApiResponse<T>> {
    const res = await this.client.request<ApiResponse<T>>(config);

    if (resSchema && res.data.data) {
      const result = resSchema.safeParse(res.data.data);
      if (!result.success) throw result.error;
      return { ...res.data, data: result.data };
    }
    
    return res.data;
  }

  get<T = any>(url: string, params?: Record<string, any>, resSchema?: ZodType<T>) {
    return this.request<T>({ url, method: 'GET', params }, resSchema);
  }

  post<T = any>(url: string, data?: any, resSchema?: ZodType<T>) {
    return this.request<T>({ url, method: 'POST', data }, resSchema);
  }

  patch<T = any>(url: string, data?: any, resSchema?: ZodType<T>) {
    return this.request<T>({ url, method: 'PATCH', data }, resSchema);
  }

  put<T = any>(url: string, data?: any, resSchema?: ZodType<T>) {
    return this.request<T>({ url, method: 'PUT', data }, resSchema);
  }

  delete<T = any>(url: string, params?: Record<string, any>, resSchema?: ZodType<T>) {
    return this.request<T>({ url, method: 'DELETE', params }, resSchema);
  }
}
