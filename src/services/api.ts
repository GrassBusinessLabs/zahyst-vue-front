import type {
   AxiosInstance,
   AxiosRequestConfig,
   AxiosResponse,
   CreateAxiosDefaults,
   InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'

import {authTokenService} from '@/services/auth-token'

export const apiService = () => {

   const authToken = authTokenService()
   const apiUrl: string = 'https://dummyjson.com/'

   const instance: AxiosInstance = axios.create({
      baseURL: apiUrl,
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      }
   } as CreateAxiosDefaults)

   instance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
      const token: string | null = await authToken.get()

      if (token) {
         config.headers!['Authorization'] = `Bearer ${token}`
      }

      return config
   })

   async function get<T = any, R = any>(url: string, config?: AxiosRequestConfig<T>): Promise<R> {
      return formattingResponse(await instance.get(url, config as AxiosRequestConfig<T>))
   }

   async function post<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig<T>): Promise<R> {
      return formattingResponse(await instance.post(url, data, config as AxiosRequestConfig<T>))
   }

   async function put<T = any, R = any>(url: string, data?: T, config?: AxiosRequestConfig<T>): Promise<R> {
      return formattingResponse(await instance.put(url, data, config as AxiosRequestConfig<T>))
   }

   async function del<T = any, R = any>(url: string, config?: AxiosRequestConfig<T>): Promise<R> {
      return formattingResponse(await instance.delete(url, config as AxiosRequestConfig<T>))
   }

   function formattingResponse<T = any>(response: AxiosResponse<T>): T {
      return response.data
   }

   return {
      apiUrl,
      instance,
      get,
      post,
      put,
      del
   }
}
