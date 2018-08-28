<template>
    <div class="g-page">
        <yd-pullrefresh :callback="refresh" ref="refreshCtrl">
            <yd-infinitescroll :callback="loadList" ref="scrollCtrl">
                  <ul slot="list">
                    <li v-for="(item, index) in list" :key="index" @click="itemClick(item)">
                        <div class="left">
                            <p class="name">{{item.storeName}}</p>
                            <p class="date">{{item.payDate}}</p>
                        </div>
                        <p class="type"><span>{{item.settleName}}</span></p>
                        <p class="money"><span><span class="flag">￥</span>{{item.settleamount}}</span></p>
                        <img class="arrow-right" :src="arrowIcon"/>
                    </li>
                  </ul>
                <!-- 数据全部加载完毕显示 -->
                <span slot="doneTip">我的底线在这里,没有更多数据啦</span>
                <!-- 加载中提示，不指定，将显示默认加载中图标 -->
                <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
            </yd-infinitescroll>
            <v-empty v-if="list.length == 0" class="empty-view" :msg="msg"></v-empty>
        </yd-pullrefresh>
    </div>
</template>

<script>
import base from 'pages/base'
import vEmpty from 'src/components/empty'

import {apiCard} from 'utils/api'
import {appInfo} from 'utils/appInfo'
import {updateListData, eventBus} from 'utils/common'

import Vue from 'vue';
import {InfiniteScroll} from 'vue-ydui/dist/lib.rem/infinitescroll';
Vue.component(InfiniteScroll.name, InfiniteScroll);
let arrowIcon = require('assets/images/right.png');

export default {
  mixins: [base],
  components: {vEmpty},
  data() {
    return {
      arrowIcon: arrowIcon,
      page: 1,
      pageSize: 10,
      pageResult: {},
      list: [],
      msg: '您还没有消费记录'
    }
  },
  mounted() {
    this.loading();
    this.getData(1);
  },
  methods: {
    refresh() {
      this.page = 1;
      this.getData(1).then(() => {
        this.$refs.refreshCtrl.$emit('ydui.pullrefresh.finishLoad');
      });
    },
    loadList() {
      if (this.page >= this.pageResult.pageCount) {
        /* 所有数据加载完毕 */
        this.$refs.scrollCtrl.$emit('ydui.infinitescroll.loadedDone');
      } else {
        this.page++;
        this.getData(this.page).then(() => {
          /* 单次请求数据完毕 */
          this.$refs.scrollCtrl.$emit('ydui.infinitescroll.finishLoad');
        });
      }
    },
    getData(pageIndex) {
      let param = {
        beginDate: '',
        endDate: '',
        openId: appInfo.getData().openidCard || '',
        pageIndex: pageIndex || 1,
        pageSize: 50
      };
      return apiCard.queryfundRecord(param).then(res => {
        this.loading(false);
        this.pageResult = res.pageResult;
        let data = res.data || {};
        let rows = data.records || [];
        if (param.pageIndex > 1) {
          rows = this.list.concat(rows);
        }
        updateListData(this.list, rows);
        return {};
      }).catch(() => {
        this.loading(false);
      });
    },
    itemClick(item) {
      this.$router.push({path: '/consume/detail'});
      setTimeout(() => {
        eventBus.$emit('event-consume-detail', item);
      }, 200)
    }
  },
  watch: {},
  computed: {}
}
</script>

<style  lang="scss" scoped>
  .empty-view {
    padding-top: 1.5rem;
    padding-bottom: 5rem;
  }
  .arrow-right {
      width: 0.2rem;
      height: 0.38rem;
      margin-top: 0.4rem;
  }
  ul {
    > li {
        padding: 0 0.4rem;
        display: flex;
        justify-content: space-between;
        height: 1.28rem;
        border-bottom: 1px solid #DFE0E3;
      }
      .left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .name {
            color: #28323C;
          }
          .date {
            color: #8C96A0;
            margin-top: 0.08rem;
            font-size: 0.24rem;
          }
      }
      .type {
          color: #28323C;
          display: flex;
          flex-direction: column;
          justify-content: center;
      }
      .flag {
          color: #28323C;
      }
      .money {
          font-size: 0.36rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
      }
  }
</style>
