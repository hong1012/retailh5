<template>
    <div class="g-page">
      <div>
        <div class="header" @click="getData">
          <p>会员卡</p>
          <p class="card-no">3432123432523533445566</p>
        </div>
        <div class="content">
          <div class="left">
            <p>100</p>
            <p>余额</p>
          </div>
          <div class="right" @click="recharge">充值</div>
        </div>
      </div>
      <yd-cell-group title="">
        <yd-cell-item arrow @click.native="rechargeList" class="icon-cell">
          <img slot="icon" class="icon-img" :src="moneyIcon" />
          <span slot="left">充值记录</span>
        </yd-cell-item>
        <yd-cell-item arrow  @click.native="consumeList" class="icon-cell">
          <img slot="icon" class="icon-img" :src="consumeIcon" />
          <span slot="left">消费记录</span>
        </yd-cell-item>
      </yd-cell-group>
    </div>
</template>

<script>
/*eslint-disable*/
import base from 'pages/base'
import {apiCard, apiTest} from 'utils/api'
import Vue from 'vue';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.rem/cell';
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);

let moneyIcon = require('assets/images/money.svg');
let consumeIcon = require('assets/images/consume.svg');

export default {
  mixins: [base],
  components: {},
  data() {
    return {
      moneyIcon: moneyIcon,
      consumeIcon: consumeIcon
    }
  },
  mounted() {
  },
  methods: {
    getData() {
      let params = {"skey":"","nickname":"","info":{"lableName":"","startDate":"","endDate":"","dateRange":"","mobile":"","name":"","type":"","nickname":"","shopid":"","shopname":""},"orderColum":"","orderRule":"","shopid":"","pageIndex":1,"pageSize":20,"fromDate":"","toDate":""}
      apiTest.list(params).then(res => {
        console.log(res)
        this.toast('接口调用可以');
      });
      apiCard.getTicket({}).then(res => {
        console.log(res)
        this.toast('ticket');
      });
    },
    recharge() {
      this.$router.push({path: '/recharge/index'})
    },
    rechargeList() {
      this.$router.push({path: '/recharge/list'})
    },
    consumeList() {
      this.$router.push({path: '/consume/list'})
    }
  },
  watch: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #5C92FF;
    color: #ffffff;
    height: 2.1rem;
    font-size: 0.32rem;
    border-bottom: 1px solid rgba(255,255,255,0.20);
    > p {
        text-align: left;
        padding: 0.08rem;
        padding-left: 0.3rem;
        margin-bottom: 0.2rem;
      }
      .card-no {
        font-size: 0.28rem;
      }
  }
  .content {
    display: flex;
    justify-content: center;
    > div {
        flex: 1;
        text-align: center;
        height: 1.32rem;
        background: #5C92FF;
        color: #ffffff;
      }
    .left {
      border-right: 1px solid rgba(255,255,255,0.20);
      padding-top: 0.16rem;
      > p {
          margin-top: 0.08rem;
          font-size: 0.28rem;
        }
    }
    .right {
      line-height: 1.4rem;
      font-size: 0.32rem;
      letter-spacing: 0.03rem;
    }
  }
  .icon-img {
    width: 0.4rem;
    margin-right: 0.4rem;
  }
  .icon-cell {
    height: 1.16rem;
  }
</style>
