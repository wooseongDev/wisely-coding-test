import { envConfig } from '@tools/env-config'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

interface CustomAxiosConfig<T = unknown> extends AxiosRequestConfig<T> {
  params?: Record<string, unknown>
  urlParams?: Record<string, string | number>
}

interface CustomAxiosInstance extends AxiosInstance {
  <T = unknown, U = unknown>(config: CustomAxiosConfig<U>): Promise<T>
}

export const axiosInstance = axios.create({
  baseURL: envConfig.API_ORIGIN,
}) as CustomAxiosInstance

axiosInstance.interceptors.request.use(
  (config: CustomAxiosConfig) => {
    if (!(config.url && config.urlParams)) return config

    const { urlParams } = config
    const urlParamKeys = Object.keys(urlParams)

    const url = urlParamKeys.reduce(
      (acc, key) => acc.replace(`{${key}}`, encodeURIComponent(`${urlParams[key]}`)),
      config.url
    )

    return { ...config, url }
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)
