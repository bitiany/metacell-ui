import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd';
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
}, (error: any) => {

});

axios.interceptors.response.use((res: AxiosResponse) => {
  if (res.data.code === 200) {
    return res.data && res.data;
  } if (res.status === 401) {
    window.localStorage.removeItem("persist:root")
  } else {
    message.error(res.data.errorCode || res.data.message)
    return {}
  }
}, (error: any) => {
  message.error(error.response.data.message)
  if (error.response.status === 401) {
    window.localStorage.removeItem("persist:root")
    setTimeout(() => window.location.href = "/login", 100)
  }
  return error.response.data;
});

const request = (param: any) => {
  const config = {
    ...param
  }
  if (!config.method || config.method === "get") {
    if (config.data) {
      config.params = config.data;
      delete config.data
    }
  }
  return axios(config)
}

export const get = (url: string, data?: any, config?: any) => {
  return request({
    url: url,
    method: "get",
    ...config,
    params: { ...data, t: new Date().getTime() }
  })
}

export const post = (url: string, data?: any, config?: any) => {
  return request({
    url: url,
    method: "post",
    ...config,
    data: { ...data, t: new Date().getTime() }
  })
}

export const del = (url: string, data?: any, config?: any) => {
  return request({
    url: url,
    method: "delete",
    ...config,
    params: { ...data, t: new Date().getTime() }
  })
}


export const put = (url: string, data?: any, config?: any) => {
  return request({
    url: url,
    method: "put",
    ...config,
    data: { ...data, t: new Date().getTime() }
  })
}