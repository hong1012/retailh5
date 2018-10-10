<template>
    <div class="g-page">
      <div>
        <div class="header">
          <p>{{cardName}}</p>
          <p class="card-no">{{cardid}}</p>
        </div>
        <div class="content">
          <div class="left">
            <p>{{money}}</p>
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
import {appInfo} from 'utils/appInfo'
import {eventBus} from 'utils/common'

import Vue from 'vue';
import {CellGroup, CellItem} from 'vue-ydui/dist/lib.rem/cell';
Vue.component(CellGroup.name, CellGroup);
Vue.component(CellItem.name, CellItem);

import {PullRefresh} from 'vue-ydui/dist/lib.rem/pullrefresh';
Vue.component(PullRefresh.name, PullRefresh);

import { Loading } from 'vue-ydui/dist/lib.rem/dialog';

let moneyIcon = require('assets/images/money.svg');
let consumeIcon = require('assets/images/consume.svg');

export default {
  mixins: [base],
  components: {},
  data() {
    return {
      cardName: '会员卡',
      cardid: '',
      openId: '',
      name: '',
      money: '',
      moneyIcon: moneyIcon,
      consumeIcon: consumeIcon
    }
  },
  created() {
    eventBus.$on('event-recharge-index', events => {
      this.getData();
    });
  },
  destroyed() {
    eventBus.$off('event-recharge-index');
  },
  activated() {
    this.setTitle('会员卡');
  },
  mounted() {
    this.getData();
    this.openId = appInfo.getData().openId;
    if (!this.openId) {
      this.loading('正在登录中,请稍候..');
    }
  },
  methods: {
    getData() {
      let param = {
        openId: appInfo.getData().openidCard || ''
      }
      apiCard.getMbBaseInfo(param).then(res => {
        let data = res.data || {};
        this.cardid = data.card || '';
        this.money = data.rechargeamt || '';
        this.cardName = data.mbCardName || '';
        this.name = data.name || '';
        appInfo.setCardInfo(data);
      }).catch(() => {
        this.loading(false);
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
  }
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
