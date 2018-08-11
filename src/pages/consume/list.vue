<template>
    <div class="g-page">
        <yd-infinitescroll :callback="loadList" ref="scrollCtrl">
              <ul slot="list">
                <li v-for="(item, index) in list" :key="index" @click="itemClick(item)">
                    <div class="left">
                        <p class="name">{{item.store}}</p>
                        <p class="date">{{item.date}}</p>
                    </div>
                    <p class="type"><span>{{item.type}}</span></p>
                    <p class="money"><span><span class="flag">￥</span>{{item.money}}</span></p>
                </li>
              </ul>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">我的底线在这里,没有更多数据啦</span>
            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
        </yd-infinitescroll>
      <v-empty v-if="list.length == 0" class="empty-view" :msg="msg"></v-empty>

    </div>
</template>

<script>
import base from 'pages/base'
import vEmpty from 'src/components/empty'

import Vue from 'vue';
import {InfiniteScroll} from 'vue-ydui/dist/lib.rem/infinitescroll';
Vue.component(InfiniteScroll.name, InfiniteScroll);

export default {
  mixins: [base],
  components: {vEmpty},
  data() {
    return {
      page: 1,
      pageSize: 10,
      list: [{'date': '2018-01-02', 'store': 'xx店', 'money': 1, 'type': '现金'},
        {'date': '2018-01-03', 'store': 'xx店', 'money': 2, 'type': '储值卡'},
        {'date': '2018-01-04', 'store': 'xx店', 'money': 3, 'type': '现金'}],
      //list: [],
      msg: '您还没有消费记录'
    }
  },
  mounted() {
    for (let i = 1; i < 2; i++) {
      this.list.push({'date': '2018-01-04', 'store': 'xx店', 'money': 3, 'type': '现金'});
    }
  },
  methods: {
    loadList() {
      if (this.page >= 3) {
        /* 所有数据加载完毕 */
        this.$refs.scrollCtrl.$emit('ydui.infinitescroll.loadedDone');
      } else {
        this.page++;
        this.loadData().then(() => {
          /* 单次请求数据完毕 */
          this.$refs.scrollCtrl.$emit('ydui.infinitescroll.finishLoad');
          this.list.push({'date': '2018-01-04', 'store': 'more xx店', 'money': 3, 'type': '现金'});
        });
      }
    },
    loadData() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });
    },
    itemClick(item) {
      this.$router.push({path: '/consume/detail'})
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
      .type {
          color: #28323C;
          display: flex;
          flex-direction: column;
          justify-content: center;
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
