import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'

import { baseUrl } from './index'
import { storage } from './storage'

const debug = true
let RequestCount = 0
let TIMER: any = null
const openLoading = false
export const http: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  responseType: 'json',
  withCredentials: false,
})

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (debug) console.log(config)
    let token = storage.get('token')
    if (token) {
      config.headers.admintoken = token
    }
    return config
  },
  (err: any): Promise<string> => {
    return err
  },
)

http.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse | Promise<any> => {
    if (debug) console.log(response)
    const res: any = response.data
    if (res.code !== 0) {
      return Promise.reject(res.data)
    } else {
      return Promise.resolve(res.data)
    }
  },
  (error: any) => {
    if (debug) console.error(error)
    const errInfo: any = error?.response?.data || {}
    errInfo.msg = errInfo?.msg || '服务繁忙'
    errInfo._preventDefault = false
    errInfo.preventDefault = () => {
      errInfo._preventDefault = true
    }
    if (error.response.status === 401) {
      window.location.href = window.location.href.split('#')[0] + '#/login'
      return Promise.reject(errInfo)
    }

    const timer = setTimeout(() => {
      clearTimeout(timer)
      if (errInfo._preventDefault) return
      message.error(errInfo.msg)
    }, 1)
    return Promise.reject(errInfo)
  },
)
class Toast {
  static loaded() {
    message.loading({
      content: '加载中...',
      key: 'requestLoading',
      duration: 0,
      style: {
        marginTop: '37vh',
      },
    })
  }
  static close() {
    message.success({
      duration: 0.001,
      key: 'requestLoading',
      content: '1',
      style: {
        marginTop: '37vh',
        display: 'none',
      },
    })
  }
}

class Request {
  static async request(url: string, data: any = {}, method = 'GET') {
    if (openLoading) RequestCount++ === 0 && Toast.loaded()
    let body: any = {
      method,
      url,
      ...(method === 'GET' ? { params: data } : { data }),
    }
    try {
      const response = await http(body)
      return response
    } catch (err) {
      return Promise.reject(err)
    } finally {
      if (openLoading) {
        if (TIMER) RequestCount--
        else {
          TIMER = setTimeout(() => {
            clearTimeout(TIMER)
            TIMER = null
            --RequestCount === 0 && Toast.close()
          }, 0)
        }
      }
    }
  }

  static get(path: string, data?: object | null) {
    return this.request(path, data, 'GET')
  }

  static post(path: string, data: object) {
    return this.request(path, data, 'POST')
  }

  static put(path: string, data: object) {
    return this.request(path, data, 'PUT')
  }
  static patch(path: string, data: object) {
    return this.request(path, data, 'PATCH')
  }

  static delete(path: string) {
    return this.request(path, null, 'DELETE')
  }
}

export default Request
