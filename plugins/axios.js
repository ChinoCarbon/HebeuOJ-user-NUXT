// plugins/axios.js
import {mutations} from "~/store/user";
export default function ({ $axios, redirect }) {
  // 请求拦截器
  $axios.onRequest(async config => {
    // 在请求发送前可以在这里进行一些处理，例如添加请求头等
    console.log('Making request to ' + config.url);

// 定义正则表达式
    const regex = /^(\/)?(judgement|problem|defg)\//;

// 检查URL是否匹配正则表达式
    if (regex.test(config.url)) {
      console.log("URL starts with judgement/, auth/, or abc/");

      await $axios.get("auth/checkToken", {
          "headers": {
            "token": localStorage.getItem("token"),
            "userId": JSON.parse(localStorage.getItem("user")).userId
          }
        }).then(response => {
            console.log(response)
        })


    } else {
      console.log("URL does not start with judgement/, auth/, or abc/");
    }

    return config;
  });

  // 响应拦截器
  $axios.onResponse(response => {
    // 在收到响应后可以在这里进行一些处理
    return response;
  });

  // 错误拦截器
  $axios.onError(error => {
    // 在请求出现错误时可以在这里进行一些处理
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      // 处理未授权错误，例如跳转到登录页面
      redirect('/login');
    }
    return Promise.reject(error);
  });
}
