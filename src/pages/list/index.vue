<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="index" @click="liclick">{{item.name}}</li>
    </ul>
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
      list: [{'name': '张三1'}, {'name': '张三2'}, {'name': '张三3'}, {'name': '张三4'}]
    }
  },
  created() {

  },
  destroyed() {

  },
  activated() {

  },
  mounted() {

  },
  methods: {
    liclick() {
      window.location.href = './index.html'
    }
  }
}
</script>

<style lang="scss" scoped>
  ul > li {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #343434;
  }
</style>
