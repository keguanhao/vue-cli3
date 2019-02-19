<template>
  <div class="user-list">
    <div class="table-content">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="#"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="registAddress"
          label="注册地址"
        >
        </el-table-column>
        <el-table-column
          prop="internet"
          label="网络"
        >
        </el-table-column>
        <el-table-column
          prop="ipAddress"
          label="ip地址"
        >
        </el-table-column>
        <el-table-column
          prop="registTime"
          label="注册时间"
        >
        </el-table-column>
        <el-table-column
          prop="loginTime"
          label="登录时间"
        >
        </el-table-column>
        <el-table-column
          prop="strictNum"
          label="地区编号"
        >
        </el-table-column>
        <el-table-column
          prop="cityNum"
          label="城市编号"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageIndex"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        :layout="pagination.layout"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from '../utils/axios.js'
import * as tool from '../utils/tool'
export default {
  data() {
    return {
      tableData: [],
      startNum: 1,
      pagination: {
        pageIndex: 1,
        pageSizes: [5, 10, 15, 20],
        pageSize: 10,
        total: 0,
        layout: "total, sizes, prev, pager, next, jumper"
      }
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    getTableData({
      _pageIndex,
      _pageSize,
      where,
      fun
    } = {}) {
      this.pagination.pageIndex = _pageIndex || this.pagination.pageIndex;
      this.pagination.pageSize = _pageSize || this.pagination.pageSize;

      var data = {
        pageIndex: this.pagination.pageIndex,
        pageSize: this.pagination.pageSize
      }
      axios({
        type: 'get',
        path: '/api/user/getUserInfo',
        data: data,
        fn: res => {
          this.tableData = [];
          //   console.log(this.pagination.pageSize, this.pagination.pageIndex)
          this.startNum = this.pagination.pageSize * (this.pagination.pageIndex - 1)
          //   console.log(this.startNum)
          res.data.forEach((ele, ind) => {
            const dataItem = {
              id: this.startNum + ind + 1,
              userName: ele.username,
              registAddress: ele.address,
              internet: ele.isp,
              ipAddress: ele.ip,
              registTime: tool.formatDate(ele.createTime),
              loginTime: tool.formatDate(ele.updateTime),
              strictNum: ele.region_id,
              cityNum: ele.city_id
            }
            this.tableData.push(dataItem)
          })
          this.pagination.total = res.count
          fun && fun()
        },
        errFn: err => {
          console.log(err)
        }
      })
    },
    //切换每页显示条数
    handleSizeChange(val) {
      console.log(`每页${val}条`)
      //   this.$router.push({ path: this.$router.path, query: { id: 2 } })
      this.getTableData({
        _pageSize: val
      })
    },
    //切换当前页
    handleCurrentChange(val) {
      console.log(`当前为第${val}页`)
      this.getTableData({
        _pageIndex: val,
        fun: () => {
          this.setPath()
        }
      })
    },
    //设置路径
    setPath(query) {
      console.log(111)
    }

  }
}

</script>
<style scoped lang="less">
.user-list {
  .block {
    padding: 10px;
  }
}
</style>
