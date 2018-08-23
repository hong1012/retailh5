<template>
    <div class="g-page">
        <yd-preview :buttons="[]">
            <yd-preview-header>
                <div slot="left">消费金额</div>
                <div slot="right">{{item.settleamount}}</div>
            </yd-preview-header>
            <yd-preview-item>
                <div slot="left">店铺</div>
                <div slot="right">{{item.storeName}}</div>
            </yd-preview-item>
            <yd-preview-item>
                <div slot="left">结算方式</div>
                <div slot="right">{{item.settleName}}</div>
            </yd-preview-item>
            <yd-preview-item>
                <div slot="left">付款时间</div>
                <div slot="right">{{item.payDate}}</div>
            </yd-preview-item>
            <yd-preview-item>
                <div slot="left">订单号</div>
                <div slot="right">{{item.billNo}}</div>
            </yd-preview-item>
            <yd-preview-item>
                <div slot="left">交易单号</div>
                <div slot="right">{{item.tradeNo}}</div>
            </yd-preview-item>
        </yd-preview>
    </div>
</template>

<script>
import base from 'pages/base'

import Vue from 'vue';
import {Preview, PreviewHeader, PreviewItem} from 'vue-ydui/dist/lib.rem/preview';
import {eventBus} from 'utils/common'
Vue.component(Preview.name, Preview);
Vue.component(PreviewHeader.name, PreviewHeader);
Vue.component(PreviewItem.name, PreviewItem);

export default {
  mixins: [base],
  components: {},
  data() {
    return {
      item: {
        settleName: '',
        settleamount: '',
        payDate: '',
        patradeNoyDate: '',
        billNo: ''
      }
    }
  },
  created() {
    eventBus.$on('event-consume-detail', events => {
      Object.assign(this.item, events);
    });
  },
  destroyed() {
    eventBus.$off('event-consume-detail');
  },
  mounted() {
  },
  methods: {}
}
</script>

<style  lang="scss" scoped>

</style>
