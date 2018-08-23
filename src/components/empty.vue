<template>
  <div class="empty-view">
    <img :src="emptyIcon" />
    <p>{{msg}}</p>
  </div>
</template>

<script>

let emptyIcon = require('assets/images/empty.png');
export default {
  name: '',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      emptyIcon: emptyIcon
    }
  }
}
</script>

<style lang="scss" scoped>
  .empty-view {
    text-align: center;
    margin: 0.5rem 0;
    > p {
        color: #BEC8D2;
      }
  }
  img {
    width: 2rem;
    height: 2rem;
  }
</style>
