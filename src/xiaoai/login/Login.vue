<template>
  <div class="xiaoai-login">
    <div class="content">
      <h3 class="title">小爱金融后台管理系统</h3>
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
        :rules="rules"
      >
        <el-form-item prop="user">
          <i class="iconfont icon-user"></i>
          <el-input v-model="dynamicValidateForm.user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <i class="iconfont icon-suo1"></i>
          <el-input v-model="dynamicValidateForm.password"></el-input>

        </el-form-item>
        <el-form-item>
          <el-button
            type="warning"
            @click="submitForm('dynamicValidateForm')"
            size="medium"
          >登录</el-button>

        </el-form-item>
        <p class="tishi tishi-title">温馨提示</p>
        <p class="tishi tishi-first">未登录过的用户，自动登录</p>
        <p class="tishi tishi-second">注册过的用户可凭账号密码登录</p>
      </el-form>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import * as tool from '../utils/tool'
import Home from '../layout/Home'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      dynamicValidateForm: {
        user: '',
        password: ''
      },
      rules: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['isLoadRouter'])
  },
  methods: {
    ...mapActions(['addMenu', 'loadRouter']),
    generate() {
      const menuData = [
        {          path: '/index', name: '首页', component: 'Index', icon: 'icon-shouye', noDropdown: true,
          children: [
            { path: '/index', name: '首页', component: 'Index' },
          ]
        }, {
          path: '/userlist',
          name: '用户列表',
          component: 'UserList',
          icon: 'icon-user',
          noDropdown: true,
          children: [{
            path: '/userlist',
            name: '用户列表',
            component: 'UserList'
          }]
        }, {
          path: '/messagelist',
          name: '信息列表',
          component: 'MessageList',
          icon: 'icon-xinxi',
          noDropdown: true,
          children: [{
            path: '/messagelist',
            name: '信息列表',
            component: 'MessageList',
          }]
        }, {
          path: '/messagemanage',
          name: '信息管理',
          component: 'Content',
          icon: 'icon-shezhi',
          children: [{
            path: '/personermessage',
            name: '个人信息',
            component: 'PersonerMessage'
          }, {
            path: '/modifymessage',
            name: '修改信息',
            component: 'ModifyMessage'
          }]
        }, {
          path: '/paymessage',
          name: '资金管理',
          component: 'Content',
          icon: 'icon-zijinguanli',
          children: [{
            path: '/capitalflow',
            name: '资金流水',
            component: 'CapitalFlow'          },
          {
            path: '/payment',
            name: '支付单据',
            component: 'PayMent',
          }
          ]
        }, {
          path: 'investmentmanage',
          name: '投资管理',
          component: 'Content',
          icon: 'icon-touziguanlifei',
          children: [{
            path: '/provinceinvestment',
            name: '省份投资',
            component: 'ProvinceInvestment'
          }, {
            path: '/regioninvestment',
            name: '区域投资',
            component: 'RegionInvestment'
          }]
        }, {
          path: '/financearticle',
          name: '金融文章',
          component: 'Content',
          icon: 'icon-wenzhang-copy',
          children: [{
            path: '/publisharticle',
            name: '发布文章',
            component: 'PublishArticle'
          }, {
            path: '/editarticle',
            name: '编辑文章',
            component: 'EditArticle'
          }, {
            path: '/checkArticle',
            name: '查看文章',
            component: 'CheckArticle'
          }]
        }, {
          path: '/capital',
          name: '资金数据',
          component: 'Content',
          icon: 'icon-wei-',
          children: [{
            path: '/spreadinvestment',
            name: '分布投资',
            component: 'SpreadInvestment'
          }, {
            path: '/projectspread',
            name: '项目分布',
            component: 'ProjectSpread'
          }, {
            path: '/incomecount',
            name: '收支统计',
            component: 'IncomeCount'
          }]
        }
      ]
      tool.setStore('menuData', menuData);
      this.addMenu(menuData);
      if (!this.isLoadRouter) {//判断是否已经加载路由
        const routes = tool.generateRoutesFromMenu(menuData);
        console.log(routes)
        const asyncRouterMap = [
          {
            path: '/404',
            name: '404',
            hidden: true,
            component: require('../page/404.vue')
          },
          {
            path: '/index',
            name: '',
            hidden: true,
            component: Home,
            redirect: '/index',
            children: routes
          }
        ]
        this.$router.addRoutes(asyncRouterMap);
        this.loadRouter()
      }
      //   this.$router.push('/index');
    },
    submitForm(formName) {
      this.generate()
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          console.log(this.dynamicValidateForm.user)
          axios.get(`/api/user/login`, {
            params: {
              username: this.dynamicValidateForm.user,
              password: this.dynamicValidateForm.password
            }
          })
            .then(res => {
              console.log(res)
              if (res.data.data.n == 1) {
                this.saveUserInfo()
                this.$router.push('/index')
              }

            })
          //   this.saveUserInfo()
          //   this.$router.push('/index')
        } else {
          console.log('error submit!!');
          this.$notify.error({
            title: '错误',
            message: '请输入正确的用户名和密码',
            offset: 100
          })
          return false;
        }
      });
    },
    saveUserInfo() {
      const userInfo = {
        userName: this.dynamicValidateForm.user
      }
      tool.setStore('user', userInfo)
    }
  },
  mounted() {

  },
}


</script>
<style scoped lang="less">
.xiaoai-login /deep/ .el-form {
  background: white;
  padding: 15px;
  margin-top: 20px;
  .el-button {
    width: 100%;
    box-sizing: border-box;
  }
}
.xiaoai-login /deep/ .el-form-item__content {
  position: relative;
  margin-left: 0 !important;

  .el-input__inner {
    padding: 0 25px;
    height: 30px;
    line-height: 30px;
  }
}
.xiaoai-login {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("http://www.jiouai.com/static/img/bg9.639dc7b.jpg");
  background-size: cover;
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 300px;
    .title {
      color: white;
      font-weight: bold;
      letter-spacing: 2px;
    }
    .tishi {
      font-size: 12px;
      color: green;
      text-align: left;
    }
    .tishi-first,
    .tishi-second {
      margin-left: 54px;
      line-height: 20px;
    }
    .iconfont {
      position: absolute;
      left: 4px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 5;
      color: orange;
    }
    .icon-suo1 {
      font-size: 20px;
    }
  }
}
</style>
<style>
</style>

