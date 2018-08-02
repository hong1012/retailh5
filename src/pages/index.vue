<template>
    <div class="g-page">
      <div>
        <div class="header">
          <p>云零售</p>
          <p>2342354325235235325</p>
        </div>
        <div class="content">
          <div class="left">
            <p>余额</p>
            <p>100</p>
          </div>
          <div class="right">充值</div>
        </div>
      </div>
      <yd-cell-group title="">
        <yd-cell-item arrow @click.native="recharge">
          <yd-icon slot="icon" name="feedback" size=".42rem"></yd-icon>
          <span slot="left">充值记录</span>
        </yd-cell-item>
        <yd-cell-item arrow  @click.native="consume">
          <yd-icon slot="icon" name="compose" size=".42rem"></yd-icon>
          <span slot="left">消费记录</span>
        </yd-cell-item>
      </yd-cell-group>

    </div>
</template>

<script>
import base from 'pages/base'
export default {
  mixins: [base],
  components: {},
  data() {
    return {}
  },
  mounted() {
  },
  methods: {
    recharge() {
      this.$router.push({path: '/recharge/list'})
    },
    consume() {
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
    background: #00CC66;
    color: #ffffff;
    height: 1.8rem;
    border-bottom: 1px solid #93E0D3;
    > p {
        text-align: center;
        padding: 0.08rem;
      }
  }
  .content {
    display: flex;
    justify-content: center;
    > div {
        flex: 1;
        text-align: center;
        height: 1.4rem;
        background: #00CC66;
        color: #ffffff;
      }
    .left {
      border-right: 1px solid #93E0D3;
      padding-top: 0.16rem;
    }
    .right {
      line-height: 1.4rem;
    }
  }
</style>
