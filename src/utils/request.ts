import axios , {AxiosRequestConfig, AxiosResponse} from 'axios'
// import {AUTH_TOKEN, TENANT_ID} from './constants'

axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use((config:AxiosRequestConfig) => {
  // config.headers[AUTH_TOKEN] = window.localStorage.getItem(AUTH_TOKEN)
  // if(window.localStorage.getItem(TENANT_ID)){
  //   config.headers[TENANT_ID] = window.localStorage.getItem(TENANT_ID)
  // }
  return config;
}, (error: any) => {

});

axios.interceptors.response.use((res: AxiosResponse) => {
  return res.data && res.data;
});

const request = (param:any) => {
  const config = {
    ...param
  }
  if(!config.method || config.method === "get"){
    if(config.data){
      config.params = config.data;
      delete config.data
    }
  }
  return axios(config)
}

export const get = (url:string, data?:any, config?:any) => {
  return request({
    url: url,
    method:"get",
    ...config,
    params: {...data, t: new Date().getTime()}
  })
}

export const post = (url:string, data?:any, config?:any) => {
  return request({
    url: url,
    method:"post",
    ...config,
    data: {...data, t: new Date().getTime()}
  })
}

export const del = (url:string, data?:any, config?:any) => {
  return request({
    url: url,
    method:"delete",
    ...config,
    params: {...data, t: new Date().getTime()}
  })
}
