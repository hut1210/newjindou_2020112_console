import axios from 'axios'
import baseURL from './baseUrl'
import {
    MessageBox,
    Message
} from "element-ui";

const http = {}
axios.defaults.withCredentials = true
var instance = axios.create({
    timeout: 60000000000,
    baseURL: baseURL.httpUrl,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    validateStatus(status) {
        switch (status) {
            case 400:
                Message.error('请求出错')
                break
            case 401:
                Message.warning({
                    message: '授权失败，请重新登录'
                })
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
                return
            case 403:
                Message.warning({
                    message: '拒绝访问'
                })
                break
            case 404:
                Message.warning({
                    message: '请求错误,未找到该资源'
                })
                break
            case 500:
                Message.warning({
                    message: '服务端错误'
                })
                break
        }
        return status >= 200 && status < 300
    }
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    debugger
    // 在发送请求之前做些什么
    if (config.url == "/gpauth/system/users/login") {
        return config;
    } else {
        config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token');
        if (config.method == 'get' ) {
            if(config.url.indexOf("?") > -1){
                config.url += '&tp=' + getNowTime();
                config.url = config.url;
            }else{
                config.url += '?&tp=' + getNowTime();
                config.url = config.url;
            }
          } else {
            //console.log((params));
            //if(typeof(params)=='string'){
            try {
                config.data.tp = getNowTime();
            } catch (e) {
                config.data = eval('(' + config.data + ')');
                config.data.tp = getNowTime();
                config.data = JSON.stringify(config.data);
            }
          }
        return config;
    }
   
 
      
    
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // if (response.data.bizCode && response.data.bizCode == '40014') {
    //     MessageBox.confirm('安全验证已过期,请重新登录', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //     }).then(() => {
    //         sessionStorage.removeItem('token')
    //         window.location.reload()
    //     }).catch(() => {
    //         return response.data
    //     }))__
    // } else {
    //     return response.data
    // }
    if (response.data.code && response.data.code !== 1000) {
        Message.error(response.data.info);
    }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

http.get = function (url, data) {
    return new Promise((resolve, reject) => {
        instance
            .get(url, data)
            .then(response => {
                resolve(response)
            })
            .catch(e => {
                Message.error("网络异常");
                reject(e);
                console.log(e)
            })
    })
}

http.post = function (url, data) {
    return new Promise((resolve, reject) => {
        instance
            .post(url, data)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error);
                Message.error("网络异常");
            })
    })
}
const getNowTime = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let date1 = date.getDate();
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minute =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let second =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let milliSeconds = date.getMilliseconds();
    var currentTime =
      year +
      "-" +
      month +
      "-" +
      date1 +
      " " +
      hour +
      ":" +
      minute +
      ":" +
      second +
      "." +
      milliSeconds;
    return currentTime;
  };
  
export default http