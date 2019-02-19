<template>
  <div class="left-column">
    <el-row class="tac">
      <el-col :span="6">
        <el-menu
          mode="vertical"
          theme="dark"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse=isCollapse
          :default-active="$route.path"
        >
          <template v-for="(item,index) in leftMenuList">
            <el-submenu
              :key="index"
              :index="item.path"
              v-if="item.children  && item.children.length > 0 && !item.noDropdown"
            >
              <template slot="title">
                <i :class="'iconfont '+item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <router-link
                v-for="(citem,cindex) in item.children"
                :to="citem.path"
                :key="cindex"
              >
                <el-menu-item :index='citem.path'>
                  <span slot="title">{{citem.name}}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>
            <router-link
              :to="item.path"
              :key="-index"
            >
              <el-submenu
                class="dropItem"
                v-if="item.children && item.children.length > 0 && item.noDropdown"
                :index="item.path"
              >
                <template slot="title">
                  <i :class="'iconfont '+item.icon"></i>
                  <span class="23">{{item.name}}</span>
                </template>
              </el-submenu>
            </router-link>
          </template>

        </el-menu>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['isCollapse']),
    leftMenuList() {
      return this.$store.state.menu.items
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}

</script>
<style scoped lang="less">
.left-column /deep/ .el-submenu__title {
  padding: 0 20px 0 10px !important;
}
.left-column /deep/ a {
  text-decoration: none;
}
.left-column /deep/ .el-row {
  height: 100%;
}
.left-column /deep/ .el-col {
  height: 100%;
}
.left-column /deep/ .el-col .el-menu {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.left-column {
  height: 100%;
}
.left-column .iconfont {
  margin-right: 8px;
}
//原来样式
.left-column /deep/ .el-menu--collapse {
  width: 35px !important;
}
.left-column /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
}
</style>
