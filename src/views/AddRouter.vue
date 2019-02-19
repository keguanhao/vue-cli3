<template>
  <div>
    <button @click="addRouter">动态添加路由</button>

  </div>
</template>

<script>
// import Page from '../xiaoai/page/404'
const Page = require('../xiaoai/page/404.vue').default
export default {
  data() {
    return {
    }
  },
  created() {
    console.log(Page)
  },
  methods: {
    addRouter() {
      const routes = [{
        path: '/404',
        name: '404',
        component: Page
      }]
      this.$router.addRoutes(routes)
      this.$router.push('/404')
    }
  }
}

</script>
<style scoped>
</style>
