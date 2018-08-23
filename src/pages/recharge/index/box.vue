<template>
  <div class="box" tabindex = "0" @click="itemClick">
    <p class="money"><span></span><span>{{item.money}} 元</span></p>
    <p class="give1"><img :src="giveIcon1"/><span> {{item.gmoney}} 元</span></p>
    <p class="give2"><img :src="giveIcon2"/><span> {{item.gpoint}} 分</span></p>
  </div>
</template>

<script>
import base from 'pages/base'
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
    itemClick() {
      this.$emit('itemClick', this.item);
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
    &:focus {
       border: 1px solid deepskyblue;
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
