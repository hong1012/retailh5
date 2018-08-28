<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import axios from 'axios'
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import {getUrlParam} from 'utils/common'
import {appInfo} from 'utils/appInfo'
import {apiCard} from 'utils/api'
import {Toast} from 'vue-ydui/dist/lib.rem/dialog';
const testDbid = ''

export default {
  name: 'App',
  mounted() {
    this.init();
    this.getOpenid();
  },
  methods: {
    getUrlParams() {
      let urlParam = getUrlParam();
      let dbid = urlParam.dbid || testDbid;
      let cardId = urlParam.card_id || '';
      let openidCard = urlParam.openidCard || '';
      let loginName = urlParam.loginName || '';
      let uid = urlParam.uid || '';
      let openId = urlParam.openId || '';
      // alert('cardId:' + cardId);
      appInfo.setData({
        'dbid': dbid,
        'openidCard': openidCard,
        'cardId': cardId,
        'loginName': loginName,
        'uid': uid,
        'openId': openId
      });
      return appInfo.getData();
    },
    getUrl(aInfo) {
      // let url = 'http://callbk-retail.jdy.com/wx/vip.html#/';
      let url = 'https://callbk-retail.jdy.com/wx/vip.html#/';
      // let params = '?card_id=' + aInfo.cardId + '&loginName=' + aInfo.loginName + '&dbid=' + aInfo.dbid + '&openidCard=' + aInfo.openidCard + '&uid=' + aInfo.uid;
      let params = '?dbid=' + aInfo.dbid + '&openidCard=' + aInfo.openidCard; // + '&card_id=' + aInfo.cardId
      //params = encodeURIComponent(params);
      url = url + params;
      return url;
    },
    getOpenid() {
      console.log('getOpenid');
      let aInfo = appInfo.getData();
      let url = this.getUrl(aInfo);
      let openId = aInfo.openId;
      if (!openId) {
        // 如果openid为空则调用接口 获取openid
        apiCard.getOpenidUrl({
          'url': url
        }).then(res => {
          let data = res.data;
          let url = data.url || '';
          if (url) {
            window.location.replace(url);
          }
        });
      }
    },
    init() {
      // 全局http请求配置
      let urlParams = this.getUrlParams();
      axios.interceptors.request.use(request => {
        NProgress.start()
        request.params = {
          dbid: urlParams.dbid || testDbid,
          loginName: urlParams.loginName || '',
          userid: urlParams.uid || '',
          openId: urlParams.openId || '',
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
              let errMsg = msg || '未知的系统错误';
              Toast({
                mes: errMsg,
                timeout: 5000
              });
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
