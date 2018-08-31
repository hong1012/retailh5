<template>
    <div class="g-page">
        <yd-pullrefresh :callback="refresh" ref="refreshCtrl">
            <ul>
            <li v-for="(item, index) in list" :key="index">
                <div class="left">
                    <p class="name">{{item.storeName}}</p>
                    <p class="date">{{item.createTime}}</p>
                </div>
                <p class="money"><span><span class="flag">￥</span>{{item.amt}}</span></p>
            </li>
          </ul>
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
import {PullRefresh} from 'vue-ydui/dist/lib.rem/pullrefresh';
Vue.component(PullRefresh.name, PullRefresh);

export default {
  mixins: [base],
  components: {vEmpty},
  data() {
    return {
      list: [],
      msg: '您还没有充值记录'
    }
  },
  activated() {
    this.setTitle('充值记录');
  },
  mounted() {
    this.getData();
  },
  methods: {
    refresh() {
      this.getData().then(() => {
        this.$refs.refreshCtrl.$emit('ydui.pullrefresh.finishLoad');
      });
    },
    getData() {
      let param = {
        openId: appInfo.getData().openidCard || '',
        pageIndex: 1,
        pageSize: 50
      };
      this.loading();
      return apiCard.queryRechargeRecord(param).then(res => {
        this.loading(false);
        this.pageResult = res.pageResult;
        let data = res.data || {};
        let rows = data.records || [];
        if (param.pageIndex > 1) {
          rows = this.list.concat(rows);
        }
        updateListData(this.list, rows);
      }).catch(() => {
        this.loading(false);
      });
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
