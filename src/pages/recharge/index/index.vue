<template>
    <div class="page">
      <header>
        <div class="name">{{card.mbCardName}}</div>
        <div class="card-no">{{card.card}}</div>
      </header>
      <div class="bar">
        <span class="title">充值门店:</span>
        <span class="name">{{curStore.name}}</span>
        <span class="change" @click="changeStore">更换</span>
      </div>
      <div class="box-list">
        <v-box v-for="(item, index) in boxList" :item="item" :key="index"  @itemClick="boxClick"></v-box>
        <box-input :item="itemInput"
                   @inputClick="inputClick"
                   @itemChange="itemChange" :class="{'box-input': binput}"></box-input>
      </div>
      <footer>
        <yd-button :class="['btn-footer', btnType ? 'btn-submit':'btn-disable']"
                   @click.native="recharge" :disabled="boxLoading">立即充值</yd-button>
      </footer>
      <yd-popup v-model="showPopup" position="bottom" height="70%">
        <ul class="store-view">
          <p class="title">请选择所在的门店</p>
          <li v-for="store in storeList" :key="store.id" @click="storeClick(store)">
            <div class="imgv">
              <img v-if="curStore.id == store.id" class="img" :src="selectedIcon"/>
            </div>
            <div class="info">
              <p class="name">{{store.name}}</p>
              <p class="addr">{{store.address}}</p>
            </div>
            <div class="distance">
              {{store.distance}}{{store.unit}}
            </div>
          </li>
        </ul>
      </yd-popup>
    </div>
</template>

<script>
import base from 'pages/base'
import vBox from './box.vue'
import boxInput from './boxInput.vue'
import {wxSign, wxPay, getLocation} from 'utils/wx'
import {apiCard} from 'utils/api'
import {appInfo} from 'utils/appInfo'
import {formatDate, updateListData, eventBus, getDistance, sortByField} from 'utils/common'

import Vue from 'vue';
import {Button} from 'vue-ydui/dist/lib.rem/button';
import {Popup} from 'vue-ydui/dist/lib.rem/popup';
Vue.component(Button.name, Button);
Vue.component(Popup.name, Popup);

let selectedIcon = require('assets/images/selected.png');

export default {
  mixins: [base],
  components: {vBox, boxInput},
  data() {
    return {
      selectedIcon: selectedIcon,
      showPopup: false,
      timer: 0,
      curBox: {},
      binput: true,
      curStore: {
        id: '',
        name: ''
      },
      storeList: [],
      itemInput: {
        gmoney: 0,
        gpoint: 0,
        money: ''
      },
      boxList: [],
      boxLoading: false
    }
  },
  activated() {
    this.setTitle('会员充值');
  },
  mounted() {
    this.curBox = this.itemInput;
    this.loading();
    this.getStoreList().then(storeList => {
      this.getDisInfo(storeList);
      this.getRechargeList(this.curStore.id, '').then(res => {
        this.loading(false);
      }).catch(() => {
        this.loading(false);
      });
    }).catch(() => {
      this.loading(false);
    });
  },
  computed: {
    card() {
      return appInfo.getCard()
    },
    btnType() {
      return !this.boxLoading;
    }
  },
  methods: {
    getDisInfo(storeList) {
      let appId = appInfo.carInfo.appId || '';
      apiCard.getTicket({}).then(res => {
        let data = res.data || {};
        let ticket = data.ticket || '';
        wxSign(appId, ticket).then(() => {
          getLocation().then(dinfo => {
            // 计算用户与门店的距离
            // this.toast('定位信息 ' + JSON.stringify(dinfo));
            storeList.forEach(store => {
              let dis = '';
              let lat = Number(store.lat);
              let lng = Number(store.lng);
              if (lat !== 0 || lng !== 0) {
                dis = Number(getDistance(Number(dinfo.lat), Number(dinfo.lng), lat, lng).toFixed(2));
                store.unit = '公里';
              }
              store.distance = dis;
            });
            storeList.sort(sortByField('distance', 'asc'));
          });
        });
      });
    },
    storeClick(store) {
      this.showPopup = false;
      Object.assign(this.curStore, store);
      this.getRechargeList(this.curStore.id, '');
      this.getRechargeList(this.curStore.id, Number(this.itemInput.money));
    },
    itemChange(item) {
      this.getRechargeList(this.curStore.id, item.money);
    },
    getRechargeList(storeid, money) {
      let param = {
        'storeId': storeid,
        'amt': money
      }
      this.boxLoading = true;
      return apiCard.getRechargeRule(param).then(res => {
        this.boxLoading = false;
        let data = res.data || [];
        let listData = this.formatData(data);
        if (Number(param.amt) > 0) {
          if (listData.length > 0) {
            console.log(listData[0]);
            let aitem = listData[0];
            Object.assign(this.itemInput, {
              'gmoney': aitem.gmoney,
              'gpoint': aitem.gpoint
            });
          }
        } else {
          updateListData(this.boxList, listData);
        }
      }).catch(res => {
        this.boxLoading = false;
      });
    },
    formatData(data) {
      let list = [];
      for (let item of data) {
        list.push({
          'money': item.atm,
          'gmoney': item.giftAmt,
          'gpoint': item.giftPoint
        });
      }
      return list;
    },
    changeStore() {
      this.showPopup = true;
    },
    getStoreList() {
      return apiCard.getAllStore({}).then(res => {
        let data = res.data || {};
        let rows = data.rows || [];
        let ldata = [];
        rows.forEach(item => {
          ldata.push({
            'lat': item.lat || 0,
            'lng': item.lng || 0,
            'distance': '',
            'unit': '',
            'id': item.id,
            'name': item.name,
            'address': item.province + item.city + item.region + item.address
          });
        });
        updateListData(this.storeList, ldata);
        if (ldata.length > 0) {
          Object.assign(this.curStore, ldata[0]);
        }
        return this.storeList;
      });
    },
    boxClick(item) {
      this.curBox = item;
      this.binput = false;
    },
    inputClick(item) {
      this.curBox = item;
      this.binput = true;
    },
    getBillNo() {
      let time = formatDate(new Date(), 'yyMMddHHmmssS');
      // let nonceStr = Math.random().toString(36).substr(2, 4);
      return 'wx' + time; // + '-' + nonceStr;
    },
    checkPayStatus(params, bChecking) {
      // alert(JSON.stringify(params));
      if (!bChecking) {
        this.loading('正在充值,请稍候..');
      }
      apiCard.getPayStatus(params).then(res => {
        let data = res.data || {};
        let status = data.status || 0;
        if (status === 1) {
          this.loading(false);
          this.toast('充值成功!');
          // 检测后端是否完成充值
          eventBus.$emit('event-recharge-index');
          this.$router.push({path: '/'});
        } else {
          setTimeout(() => {
            this.checkPayStatus(params, true);
          }, 300);
        }
      }).catch(() => {
        setTimeout(() => {
          this.checkPayStatus(params, true);
        }, 300);
      });
    },
    recharge() {
      let aInfo = appInfo.getData();
      let billMoney = Number(this.curBox.money) * 100;
      if (billMoney === 0) {
        this.toast('充值金额不能0!');
        return;
      }
      let params = {
        billMoney: billMoney,
        billNo: this.getBillNo(),
        cardId: aInfo.cardId,
        openId: aInfo.openId
      }
      apiCard.getPrepayId(params).then(res => {
        let payInfo = res.data || {};
        let appId = payInfo.appId || '';
        let billId = payInfo.billId || '';
        apiCard.getTicket({}).then(res => {
          let data = res.data || {};
          let ticket = data.ticket || '';
          wxSign(appId, ticket).then(() => {
            wxPay(payInfo, () => {
              let checkParams = {
                billId: billId,
                billNo: params.billNo,
                storeid: this.curStore.id,
                rechargeAmt: params.billMoney / 100,
                openId: aInfo.openidCard,
                giftAmt: this.curBox.gmoney,
                giftPoint: this.curBox.gpoint
              };
              this.checkPayStatus(checkParams);
            });
          });
        });
      });
    }
  }
}
</script>

<style  lang="scss" scoped>
  .page {
    background: #ECEBE9;
    height: 100%;
  }
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: #5C92FF;
    color: #ffffff;
    height: 1.66rem;
    font-size: 0.32rem;
    border-bottom: 1px solid rgba(255,255,255,0.20);
    > div {
        text-align: left;
        padding-left: 0.3rem;
        margin-bottom: 0.2rem;
      }
    .card-no {
      font-size: 0.28rem;
    }
  }
  footer {
    margin-top: 0.6rem;
    text-align: center;
    background: #ECEBE9;
  }
  .bar {
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.28rem;
    background: #ffffff;
    .title {
      color: #8C96A0;
      padding-left: 0.4rem;
    }
    .name {
      color: #001400;
      padding: 0 0.2rem;
    }
    .change {
      color: #FF5451;
    }
  }
  .box-list {
    background: #ECEBE9;
  }

  .btn-footer {
    background: #5C92FF;
    width: 3.62rem;
    height: 0.72rem;
    font-size: 0.36rem;
  }
  .btn-submit {
    background: #5C92FF;
  }
  .btn-disable {
    background: #ccc;
  }
  .store-view {
    .title {
      background: #EFEFF4;
      text-align: center;
      height: 0.96rem;
      line-height: 0.96rem;
    }
    > li {
      display: flex;
      padding: 0.2rem 0 0.2rem 0.1rem;
      border-bottom: 1px solid #EFEFF4;
      .imgv {
        width: 0.36rem;
        height: 0.24rem;
        margin: 0.3rem 0.2rem 0 0.1rem;
      }
      .img {
        width: 0.36rem;
        height: 0.24rem;
      }
      .distance {
        width: 80px;
        line-height: 40px;
        padding-left: 5px;
        font-size: 0.24rem;
      }
      .info{
        flex: 1;
      }
      .name{
        color: #28323C;
        font-size: 0.36rem;
      }
      .addr {
        font-size: 0.28rem;
      }
    }
  }
  .box-input {
    border: 1px solid #61A5BA !important;
  }
</style>
