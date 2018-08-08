<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import {getUrlParam} from 'utils/common'
import {appInfo} from 'utils/appInfo'
import {apiCard} from 'utils/api'

export default {
  name: 'App',
  mounted() {
    this.init();
  },
  methods: {
    getUrlParams() {
      let urlParam = getUrlParam();
      let dbid = urlParam.dbid || '';
      let cardId = urlParam.card_id || '';
      let openId = urlParam.openid || '';
      appInfo.setData({
        'dbid': dbid,
        'cardId': cardId,
        'openId': openId
      });
      return appInfo.getData();
    },
    getTicket() {
      apiCard.getTicket({}).then(res => {
        console.log('getTicket');
        console.log(res);
        let data = res.data || {};
        appInfo.setTicket(data.ticket || '');
      });
    },
    init() {
      // 全局http请求配置
      this.getTicket();
      let urlParams = this.getUrlParams();
      axios.interceptors.request.use(request => {
        NProgress.start()
        request.params = {
          dbid: urlParams.dbid || 7911391974,
          loginName: '',
          ver: '1.0',
          ts: new Date().getTime()
        }
        return request;
      }, error => {
        return Promise.reject(error)
      })
      axios.interceptors.response.use(response => {
        NProgress.done()
        if (response.status !== 200) {
          // 系统级别的错误
          // Message.error(response.statusText)
          return Promise.reject(response.statusText)
        } else {
          // 业务级别的错误
          var status = response.data.result
          var msg = response.data.msg
          switch (status) {
            case 200 : return response;
            case 201 :
              location.href = response.data.data
              break;
            // 处理同一个账号多人登录重定向
            case 202 :
              // getDefaultPage().location.href = 'http://downloads.youshang.com/ys/frontend/logout.html';
              break;
            default :
              if (response.data.errcode === 0) {
                // 云盘的接口这里不会返回200 ，反而是errcode
                return response;
              }
              // Message.error(msg || '未知的系统错误');
              return Promise.reject(msg)
          }
        }
      }, error => {
        return Promise.reject(error);
      })
    }
  }
}
</script>

<style>
  #app {
    height: 100%;
  }
</style>
