<template>
  <div class="pay-ment">
    <div class="search-box">
      <el-form
        :inline="true"
        :model="search_data"
        :rules="search_form_rules"
        ref="search_data"
        :data="tableData"
      >
        <el-form-item
          label="支付单号"
          prop="payNumber"
        >
          <el-input
            type="text"
            placeholder="请输入单号"
            v-model="search_data.payNumber"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click="screen('search_data')"
          >筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            size="mini"
            :disabled="isOpen"
          >删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        border
        @selection-change="onSelectionChange"
      >
        <el-table-column
          type="selection"
          width="80"
          align="center"
        >
        </el-table-column>
        <el-table-column
          width="120"
          v-if="idFlag"
          prop="idNum"
          label="编号"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="支付单号"
          width="160"
          align="center"
          prop="payNumber"
        ></el-table-column>
        <el-table-column
          label="订单金额"
          :sortable="true"
          prop="orderMoney"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          label="收益金额"
          :sortable="true"
          prop="incomeMoney"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          label="支付项目"
          prop="payType"
          width="120"
          align="center"
          :filters="fields.payType.filter.list"
          :filter-method="fitleMethods"
        >
          <template slot-scope="scope">
            <el-tag>
              {{scope.row.payType}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="下单时间"
          :sortable="true"
          prop="orderTime"
          width="210"
          align="center"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.orderTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="支付状态"
          prop="payStatus"
          width="120"
          align="center"
          :filters="fields.payStatus.filter.list"
          :filter-method="payStausFilter"
        >
          <template slot-scope="scope">
            {{resultStaus(scope.row.payStatus)}}
          </template>
        </el-table-column>
        <el-table-column
          label="备注"
          align="center"
          prop="remarks"
        ></el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        v-if="pageData.total"
        :total="pageData.total"
        :page-size="pageData.pageSize"
        :layout="pageData.layOut"
        :page-sizes="pageData.pageSizes"
        :current-page="pageData.currentPage"
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
      >

      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from '../utils/axios'
import dTime from 'time-formater'
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      let reg = /(\d){15}/g;
      if (!reg.test(value)) {
        console.log(11)
        callback(new Error('请输入15位数字单号'))
      } else {
        callback()
      }
    }
    return {
      Loading: null,
      search_form_rules: {
        payNumber: [{
          //   required: false,
          //   validator: validatePass,
          //   trigger: 'blur'
          required: false,
          message: '支付单号不能为空',
          trigger: 'blur'
        }]
      },
      fields: {
        payType: {
          filter: {
            list: [{
              text: '债券',
              value: '债券'
            }, {
              text: '股票',
              value: '股票'
            }, {
              text: '借款',
              value: '借款'
            }, {
              text: '保险',
              value: '保险'
            }, {
              text: '投标',
              value: '投标'
            }],
            multiple: true
          }
        },
        payStatus: {
          filter: {
            list: [{
              text: '支付成功',
              value: 0
            }, {
              text: '待支付',
              value: 1
            }, {
              text: '支付失败',
              value: 2
            }],
            multiple: true
          }
        }
      },
      pageData: {
        total: 0,
        pageSizes: [5, 10, 15, 20],
        pageSize: 20,
        currentPage: 1,
        layOut: "total, sizes, prev, pager, next, jumper"
      },
      isOpen: true,
      idFlag: false,
      startNum: 1,
      tableData: [],
      search_data: {
        payNumber: ''
      },

    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    onSelectionChange(val) {
      console.log(val)
      if (val.length !== 0) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    },
    getDataByPayNumber({
      payNumber
    } = {}) {
      let data = { payNumber }
      axios({
        type: 'get',
        path: 'api/money/screeoutPayList',
        data,
        fn: res => {
          this.Loading.close();
          this.$message({ message: '筛选成功', type: 'success' })
          this.tableData = [];
          this.pageData.total = res.count;
          res.data.forEach((ele, ind) => {
            let item = {
              idNum: ind + this.startNum + 1,
              payNumber: ele.payNumber,
              orderMoney: ele.orderMoney,
              incomeMoney: ele.incomeMoney,
              payType: ele.payType,
              orderTime: dTime(ele.orderTime).format('YYYY-MM-DD HH:mm:ss'),
              payStatus: ele.payStatus,
              remarks: ele.remarks
            }
            this.tableData.push(item)
          })
        },
        errFn: err => {
          console.log(err)
        }
      })
    },
    resultStaus(staus) {
      if (staus == 0) {
        return '支付成功'
      } else if (staus == 1) {
        return '等待支付'
      } else {
        return '支付失败'
      }
    },
    payStausFilter(value, row, column) {
      return value == row.payStatus
    },
    fitleMethods(value, row, column) {
      console.log(value, row, column)
      return row.payType == value
    },
    screen(refName) {
      this.$refs[refName].validate(valid => {
        if (valid) {
          this.getDataByPayNumber({
            payNumber: this.search_data.payNumber
          })
          this.Loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
      })
    },
    sizeChangeHandle(val) {
      console.log(val)
      this.getTableData({ pageSize: val })
    },
    currentChangeHandle(val) {
      this.getTableData({ pageIndex: val })
    },
    getTableData({
      pageIndex,
      pageSize,
      fun
    } = {}) {
      this.pageData.currentPage = pageIndex || this.pageData.currentPage;
      console.log(this.pageData.currentPage)
      this.pageData.pageSize = pageSize || this.pageData.pageSize;
      let data = {
        pageIndex: this.pageData.pageIndex,
        pageSize: this.pageData.pageSize
      }
      axios({
        path: 'api/money/getPayList',
        type: 'get',
        data,
        fn: res => {
          console.log(res)
          this.startNum = this.pageData.pageSize * (this.pageData.currentPage - 1)
          console.log(this.startNum)
          this.pageData.total = res.count;
          this.tableData = [];
          res.data.forEach((ele, ind) => {
            let tableItem = {
              idNum: ind + this.startNum + 1,
              payNumber: ele.payNumber,
              orderMoney: ele.orderMoney,
              incomeMoney: ele.incomeMoney,
              payType: ele.payType,
              orderTime: dTime(ele.orderTime).format('YYYY-MM-DD HH:mm:ss'),
              payStatus: ele.payStatus,
              remarks: ele.remarks
            }
            this.tableData.push(tableItem)

          })

        }
      })
    }
  }
}

</script>
<style scoped>
</style>
