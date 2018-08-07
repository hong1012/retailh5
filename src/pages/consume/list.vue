<template>
    <div class="g-page">
      <v-empty class="empty-view"></v-empty>
    </div>
</template>

<script>
import base from 'pages/base'
import vEmpty from 'src/components/empty'

export default {
  mixins: [base],
  components: {vEmpty},
  data() {
    return {}
  },
  mounted() {
  },
  methods: {},
  watch: {},
  computed: {}
}
</script>

<style  lang="scss" scoped>
  .empty-view {
    padding-top: 1rem;
  }
</style>
