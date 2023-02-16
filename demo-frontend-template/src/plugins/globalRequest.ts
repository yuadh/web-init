/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { message } from 'antd';
import {extend} from 'umi-request';
import {history} from "@@/core/history";
import {stringify} from "querystring";
 
 

 
/**
 * 配置request请求时的默认参数
 */
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  // requestType: 'form',
  prefix:process.env.NODE_ENV === 'production'?"http://init.yuadh.com":undefined,
});
 
/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  return {
    url,
    options: {
      ...options,
      headers: {
      },
    },
  };
});
 
/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response): Promise<any> => {

  const res = await response.clone().json();
  if(res.code===200){
    return res.data
  }
  if(res.code===40100){
    message.error('请登录')
    history.replace({
      pathname:'/user/login',
      search: stringify({
        redirect: location.pathname
      })
    })
  }else {
    message.error(res.message)
  }
  console.log(res.data)
  return res.data;
});
 
export default request;