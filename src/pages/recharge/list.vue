<template>
    <div class="g-page">
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
    </div>
</template>

<script>
import base from 'pages/base'
import vEmpty from 'src/components/empty'

import {apiCard} from 'utils/api'
import {appInfo} from 'utils/appInfo'
import {updateListData, eventBus} from 'utils/common'

export default {
  mixins: [base],
  components: {vEmpty},
  data() {
    return {
      list: [],
      msg: '您还没有充值记录'
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let param = {
        openId: appInfo.getData().openidCard || '',
        pageIndex: 1,
        pageSize: 50
      };
      return apiCard.queryRechargeRecord(param).then(res => {
        this.pageResult = res.pageResult;
        let data = res.data || {};
        let rows = data.records || [];
        if (param.pageIndex > 1) {
          rows = this.list.concat(rows);
        }
        updateListData(this.list, rows);
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
