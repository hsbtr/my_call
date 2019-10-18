import axios from "axios";
import { Message } from "element-ui";
import Qs from "qs";
import checkStatus from "./utils";

const config = axios.create({
  baseURL: "http://192.168.5.179:3030",
  timeout: 5000,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [
    function(data) {
      // 对 data 进行任意转换处理
      // JSON.stringify(data)
      console.log(data);
      return Qs.stringify(data);
    }
  ],
  withCredentials: false // default
});

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    console.log(config);
    config.headers = Object.assign(
      config.method === "get"
        ? {
            Accept: "application/json",
            "Content-Type": "application/json; charset=UTF-8"
          }
        : {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
      config.headers
    );
    // if (config.method === "post") {
    //   const contentType = config.headers["Content-Type"];
    //   // 根据Content-Type转换data格式
    //   if (contentType) {
    //     if (contentType.includes("multipart")) {
    //       // 类型 'multipart/form-data;'
    //       // config.data = data;
    //       console.log(7);
    //     } else if (contentType.includes("json")) {
    //       // 类型 'application/json;'
    //       // 服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
    //       config.data = JSON.stringify(config.data);
    //       console.log(8);
    //     } else {
    //       // 类型 'application/x-www-form-urlencoded;'
    //       // 服务器收到的raw body(原始数据) name=nowThen&age=18
    //       config.data = Qs.stringify(config.data);
    //       console.log(2);
    //     }
    //   }
    // }
    // return config;
    return Promise.resolve(config);
  },
  error => {
    return Promise.error(error);
  }
);

// 响应拦截器
config.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    }
  },
  error => {
    const { response } = error;
    if (response) {
      let hint = checkStatus(response);
      console.log(hint);
      Message({
        message: hint.msg,
        type: "error",
        center: true
      });
      return Promise.reject(response);
    }
    console.log(error.message);
  }
);

export default config;

// config里面有这个transformRquest， 这个选项会在发送参数前进行处理。 这时候我们通过Qs.stringify转换为表单查询参数
/*
transformRequest: [function (data) {
  data = Qs.stringify(data);
  return data;
}],
    // 设置Content - Type
    headers: {
  'Content-Type': 'application/x-www-form-urlencoded'
}  */
