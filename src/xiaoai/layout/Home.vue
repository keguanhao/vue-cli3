<template>
  <div>
    <home-header></home-header>
    <div class="content">
      <left-column></left-column>

      <div class="right-content">
        <bread></bread>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeader from './Header'
import LeftColumn from './LeftColumn'
import Bread from './Bread'
export default {
  data() {
    return {
    }
  },
  created() {
    console.log(this.$store.state.page.text)
  },
  components: {
    HomeHeader,
    LeftColumn,
    Bread
  }
}

</script>
<style scoped lang="less">
.content {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top: 61px;
  bottom: 0;
  overflow: auto;
  .right-content {
    flex-grow: 1;
    overflow: auto;
    min-width: 960px;
  }
}
</style>
