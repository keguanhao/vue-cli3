<template>
  <div class="brand">
    <span
      @click="handLeftMenu"
      class="icon"
    >
      <i
        class="iconfont icon-iconmore"
        :class="{isActive: isChange}"
      ></i>
    </span>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item,index) in brandList"
        :key="index"
      >{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChange: false,
      brandList: ''
    }
  },
  created() {
    this.brandList = this.getBrandList()
  },
  methods: {
    handLeftMenu() {
      this.$store.dispatch('setLeftCollapse');//是否收缩左边菜单栏
      this.$store.dispatch('setLeftWidth')
      //   console.log(this.$store.state.page.rightContentWidth.width)
      this.setSize()
      this.isChange = !this.isChange;
    },
    setSize() {
      const rightContentWidth = {
        width: this.$store.state.menu.leftMenu.isOpen ? document.body.clientWidth - 180 : document.body.clientWidth - 35,
        height: document.body.clientHeight
      }
      this.$store.dispatch('setRightWidth', rightContentWidth)
    },
    getBrandList() {
      const filterItem = this.$route.matched.filter(item => item.name);
      let resultArr = [];

      if (filterItem[0].path == '/userlist' || filterItem[0].path == '/messagelist') {
        resultArr.push(filterItem[0].name);
      } else if (filterItem[0].path == '/index') {
        resultArr = []
      } else {
        filterItem.forEach(item => {
          resultArr.push(item.name)
        })
      }
      return resultArr
    }
  },
  watch: {
    $route() {
      this.brandList = this.getBrandList()
    }
  }
}

</script>
<style scoped lang="less">
.brand /deep/ .el-breadcrumb {
  margin-left: 30px;
}
.brand {
  padding: 12px;
  background: pink;
  .icon {
    float: left;
  }
  .isActive {
    display: inline-block;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    transition: 0.5s;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }
}
</style>
