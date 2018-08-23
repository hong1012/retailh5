<template>
  <div class="box" tabindex = "1" @click="itemClick">
    <p class="money"><span></span><span>
      <input type="number" class="money-input" :value="item.money"
             @keypress="keypress" @change="itemChange" @input="itemInput"/> 元</span>
    </p>
    <p class="give1"><img :src="giveIcon1"/><span> {{item.gmoney}} 元</span></p>
    <p class="give2"><img :src="giveIcon2"/><span> {{item.gpoint}} 分</span></p>
  </div>
</template>

<script>
import base from 'pages/base'
import {limitNumber} from 'utils/common'
let giveIcon1 = require('assets/images/give1.png');
let giveIcon2 = require('assets/images/give2.png');

export default {
  mixins: [base],
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      giveIcon1: giveIcon1,
      giveIcon2: giveIcon2
    }
  },
  mounted() {
  },
  methods: {
    itemInput(e) {
      console.log('itemInput');
      console.log(e.target.value);
      this.item.money = e.target.value;
      this.$emit('itemChange', this.item);
    },
    keypress(events) {
      console.log('keypress');
      console.log(events);
      limitNumber(events, this.item.money, 2, 10);
    },
    itemChange(e) {
    },
    itemClick() {
      this.$emit('inputClick', this.item);
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    display: inline-block;
    border: 1px solid #bebebe;
    margin: 0.36rem 0 0 0.36rem;
    border-radius: 4px;
    background: #ffffff;
    height: 2rem;
    width: 2rem;
    .money-input {
      display: inline-block;
      width: 1.2rem;
      border: 1px solid #bbb;
      font-size: 0.32rem;
      padding-left: 0.06rem;
      &:focus {
         border: 1px solid deepskyblue;
       }
    }
    > p > span {
        vertical-align: middle;
      }
    .money {
      color: #28323C;
      margin: 0.18rem 0 0 0.18rem;
    }
    .give1 {
      color: #5A646E;
      margin: 0.29rem 0 0 0.18rem;
    }
    .give2 {
      color: #5A646E;
      margin: 0.1rem 0 0 0.18rem;
    }
  }
  img {
    width: 0.32rem;
    height: 0.32rem;
    vertical-align: middle;
  }
</style>
