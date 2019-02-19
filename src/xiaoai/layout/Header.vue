<template>
  <div class="home-header">
    <div class="left">
      <img
        src="http://www.jiouai.com/static/img/logo.236d7c9.png"
        alt=""
      >
      小爱金融后台管理系统
    </div>
    <div class="right">
      <div class="icon-list">
        <ul class="ul">
          <li class="item">
            <el-badge
              :value="6"
              class="item"
            >
              <el-button size="small">
                <i class="iconfont icon-iconmore"></i>
              </el-button>
            </el-badge>
          </li>
          <li class="item">
            <el-badge
              :value="12"
              class="item"
            >
              <el-button size="small">
                <i class="iconfont icon-Group-"></i>
              </el-button>
            </el-badge>
          </li>
          <li class="item">
            <el-badge
              :value="12"
              class="item"
            >
              <el-button size="small">
                <i class="iconfont icon-nitification"></i>
              </el-button>
            </el-badge>
          </li>
        </ul>
      </div>
      <div class="right-user">
        <div class="user-wrapper">
          <img
            src="../src/img/touxiang.png"
            alt=""
          >
        </div>
        <div class="des-wrapper">
          <p>欢迎</p>
          <p>wenbing</p>
        </div>

      </div>
      <div class="slide">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">修改信息</el-dropdown-item>
            <el-dropdown-item command="b">修改密码</el-dropdown-item>
            <el-dropdown-item command="c">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="back-wrapper">
        <i class="iconfont icon-fanhui"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}

</script>
<style scoped lang="less">
.home-header /deep/ .el-badge__content.is-fixed {
  top: 14px;
}
.home-header /deep/ .el-button {
  padding: 2px 4px;
  border: 1px solid white;
}
.home-header {
  background: url("../src/img/head-bg.png");
  background-size: cover;
  min-width: 960px;
  height: 61px;
  line-height: 61px;
  padding: 0 10px;
  .left {
    float: left;
    font-size: 20px;
    color: white;
    letter-spacing: 2px;
    img {
      width: 40px;
      vertical-align: middle;
    }
  }
  .right {
    float: right;
    .icon-list,
    .right-user,
    .back-wrapper,
    .slide {
      float: left;
    }
    .icon-list {
      margin-right: 20px;
    }
    .right-user {
      display: flex;
      height: 62px;
      align-items: center;
      margin-right: 20px;
      line-height: 1;
      .user-wrapper {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .des-wrapper {
        height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 14px;
        color: white;
      }
    }
    .slide {
      margin-right: 20px;
    }
    .back-wrapper {
      .icon-fanhui {
        font-size: 18px;
        color: white;
      }
    }
    .icon-list {
      .ul {
        overflow: hidden;
        .item {
          float: left;
          margin-right: 8px;
          .iconfont {
            font-size: 20px;
            color: blue;
          }
        }
      }
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 14px;
    color: white;
  }
}
</style>
