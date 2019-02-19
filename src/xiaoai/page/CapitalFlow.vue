<template>
  <div class="captial-flow">
    <div class="search-box">
      <el-form
        :inline="true"
        :model="searchData"
        ref="searchData"
        class="demo-form-inline"
      >
        <el-form-item class="add-btn">
          <el-button
            type="primary"
            size="small"
            @click="addMessage()"
          >
            添加
          </el-button>
        </el-form-item>
        <el-form-item label="投标时间筛选：">
          <el-date-picker
            v-model="searchData.startTime"
            type="datetime"
            placeholder="选择开始时间"
            :default-time="defaultTime"
          >
          </el-date-picker>
        </el-form-item>
        <span class="split">
          --
        </span>
        <el-form-item>
          <el-date-picker
            v-model="searchData.endTime"
            type="datetime"
            placeholder="选择结束时间"
            :default-time="defaultTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSubmit('searchData')"
          >筛选</el-button>
        </el-form-item>
      </el-form>

    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="num"
          label="序号"
          align="center"
          sortable
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          width="220"
          sortable
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="incomePayType"
          align="center"
          label="收支类型"
          width="180"
          :formatter="formatterType"
          :filter-method="filterType"
          :filters="fields.incomePayType.filter.list"
        >
        </el-table-column>
        <el-table-column
          prop="incomeDes"
          label="收支描述"
          align="center"
          width="240"
        >
        </el-table-column>
        <el-table-column
          prop="income"
          label="收入"
          width="170"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="pay"
          label="支出"
          width="170"
          sortable
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="accoutCash"
          label="账户现金"
          sortable
          width="170"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="remarks"
          align="center"
          label="备注"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="250"
          fixed="right"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="warning"
              icon='edit'
              size="mini"
              @click="edit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              icon='delete'
              size="mini"
              @click="delete(scoped.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageData.pageIndex"
        :page-sizes="pageData.pageSizes"
        :page-size="pageData.pageSize"
        :layout="pageData.layout"
        :total="pageData.total"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :modal-append-to-body="false"
    >
      <el-form
        :model="dialogForm"
        :rules="formRules"
        ref="form"
        :label-width="dialog.formLabelWidth"
      >
        <el-form-item label="收支类型">
          <el-select
            v-model="dialogForm.incomePayType"
            placeholder="收支类型"
          >
            <el-option
              label="提现"
              value="0"
            ></el-option>
            <el-option
              label="提现手续费"
              value="1"
            ></el-option>
            <el-option
              label="提现锁定"
              value="2"
            ></el-option>
            <el-option
              label="理财服务退出"
              value="3"
            ></el-option>
            <el-option
              label="购买宜定盈"
              value="4"
            ></el-option>
            <el-option
              label="充值"
              value="5"
            ></el-option>
            <el-option
              label="优惠券"
              value="6"
            ></el-option>
            <el-option
              label="充值礼券"
              value="7"
            ></el-option>
            <el-option
              label="转账"
              value="8"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="收支描述"
          prop="incomePayDes"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="dialogForm.incomePayDes"
            autocomplete="off"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="收入"
          prop="income"
          :label-width="formLabelWidth"
        >
          <el-input v-model.number="dialogForm.income"></el-input>
        </el-form-item>
        <el-form-item
          label="支出"
          prop="pay"
          :label-width="formLabelWidth"
        >
          <el-input v-model.number="dialogForm.pay"></el-input>
        </el-form-item>
        <el-form-item
          label="现金账户"
          prop="accoutCash"
          :label-width="formLabelWidth"
        >
          <el-input v-model.number="dialogForm.accoutCash"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            autocomplete="off"
            type="textarea"
            :label-width="formLabelWidth"
            v-model="dialogForm.remarks"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialog.show = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submit('form')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from '../utils/axios'
import * as tool from '../utils/tool'
export default {
  data() {
    let validateData = (rule, value, callback) => {
      console.log(rule, value)
      if (value == '') {
        let text;
        if (rule.field == 'income') {
          text = '收入'
        } else if (rule.field == 'pay') {
          text = '支付'
        } else {
          text = '账户现金'
        }
        callback(new Error(text + '不能为空'))
      } else {
        let numReg = /^[0-9]+.?[0-9]*$/;
        if (!numReg.test(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback()
        }
      }
    };
    return {
      editId: '',
      dialogForm: {
        incomePayType: '',
        incomePayDes: '',
        income: '',
        pay: '',
        accoutCash: '',
        remarks: ''
      },
      //弹框详情
      dialog: {
        width: '400px',
        show: false,
        title: '修改资金信息',
        formLabelWidth: '120px'
      },
      formRules: {
        incomePayDes: [{
          required: true,
          message: '收支描述不能为空',
          trigger: 'blur'
        }],
        income: [{
          required: true,
          validator: validateData,
          trigger: 'blur'
        }],
        pay: [{
          required: true,
          validator: validateData,
          trigger: 'blur'
        }],
        accoutCash: [
          { required: true, validator: validateData, trigger: 'blur' },
        ]
      },
      sortNum: 0,
      defaultTime: tool.allFormatDate(new Date(), 4),
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      pageData: {
        pageIndex: 1,
        pageSizes: [10, 15, 20, 25],
        pageSize: 10,
        total: 0,
        layout: "total, sizes, prev, pager, next, jumper"
      },
      searchData: {
        startTime: '',
        endTime: ''
      },
      format_type_list: {
        0: '提现',
        1: '提现手续费',
        2: '提现锁定',
        3: '理财服务退出',
        4: '购买宜定盈',
        5: '充值',
        6: '优惠券',
        7: '充值礼券',
        8: '转账'
      },
      tableData: [],
      fields: {
        incomePayType: {
          filter: {
            list: [{
              text: '提现',
              value: 0
            }, {
              text: '提现手续费',
              value: 1
            }, {
              text: '提现锁定',
              value: 2
            }, {
              text: '理财服务退出',
              value: 3
            }, {
              text: '购买宜定盈',
              value: 4
            }, {
              text: '充值',
              value: 5
            }, {
              text: '优惠券',
              value: 6
            }, {
              text: '充值礼券',
              value: 7
            }, {
              text: '转账',
              value: 8
            }],
            multiple: true
          }
        },
        create_time: {
          info: {
            prop: 'create_time',
            label: '日期',
            sortable: true
          },
          filter: {

          },
          style: {
            width: '260',
            align: 'center'
          }
        },
      }
    }
  },
  mounted() {
    this.getData({
      fun: () => {

      }
    })
  },
  methods: {
    addItem(data) {
      axios({
        type: 'get',
        path: '/api/money/addMoneyIncomePay',
        data,
        fn: res => {
          console.log(res)
          this.$message('新增成功');
          this.pageData.total = res.count;
          this.getData();
          this.dialog.show = false;
        },
        errFn: err => {
          this.$message('新增失败')
          console.log(err);
        }
      })
    },
    //提交编辑方法
    editItem(data) {
      console.log('edit')
      axios({
        type: 'get',
        path: '/api/money/editMoneyIncomePay',
        data,
        fn: res => {
          console.log(res)
          this.getData();
          this.$message('编辑成功')
          this.dialog.show = false;
          this.editId = "";
        },
        errFn: err => {
          this.$message('编辑失败')
          console.log(err)
        }
      })
    },
    edit(val) {
      console.log(val)
      this.dialog.title = '编辑资金信息';
      this.editId = val.id;
      this.dialogForm.incomePayType = val.incomeType;
      this.dialogForm.incomePayDes = val.incomeDes;
      this.dialogForm.income = Number(val.income);
      this.dialogForm.pay = Number(val.pay);
      this.dialogForm.accoutCash = Number(val.accoutCash);
      this.dialogForm.remarks = val.remarks;
      this.dialog.show = true;

    },
    submit(val) {
      this.$refs[val].validate((res) => {
        if (res) {
          let formDialogData = this.dialogForm;
          var data = {};
          data.id = this.editId;
          data.accoutCash = formDialogData.accoutCash;
          data.income = formDialogData.income;
          data.pay = formDialogData.pay;
          data.incomePayType = formDialogData.incomePayType;
          data.incomePayDes = formDialogData.incomePayDes;
          data.remarks = formDialogData.remarks
        }
        console.log(data)
        if (this.editId != "") {
          //   console.log('editItem')
          this.editItem(data)
        } else {
          //   console.log('addItem')
          this.addItem(data)
        }
      })
    },
    addMessage() {
      console.log('add')
      const dialogMessage = this.dialogForm;
      for (var props in dialogMessage) {
        dialogMessage[props] = ''
      }
      this.dialog.title = "新增资金信息";
      this.dialog.show = true;
    },
    handleSizeChange(val) {
      this.getData({
        pageSize: val
      })
    },
    handleCurrentChange(val) {
      this.getData({
        pageNum: val
      })
    },
    getData({
      pageNum,
      pageSize,
      fun
    } = {}) {
      this.pageData.pageIndex = pageNum ? pageNum : this.pageData.pageIndex;
      this.pageData.pageSize = pageSize ? pageSize : this.pageData.pageSize;
      const data = {
        pageIndex: this.pageData.pageIndex,
        pageSize: this.pageData.pageSize
      }
      axios({
        type: 'get',
        path: '/api/money/getMoneyIncomePay',
        data: data,
        fn: res => {
          console.log(res);
          this.tableData = [];
          res.data.forEach((ele, ind) => {
            const newData = {
              num: (this.pageData.pageIndex - 1) * this.pageData.pageSize + ind + 1,
              id: ele._id,
              createTime: tool.formatDate(ele.createTime),
              incomeType: ele.incomePayType,
              incomeDes: ele.incomePayDes,
              income: ele.income,
              accoutCash: ele.accoutCash,
              pay: ele.pay,
              remarks: ele.remarks
            };
            this.tableData.push(newData)
          })
          console.log(this.tableData)
          this.pageData.total = res.count;
          fun && fun()
        },
        errFn: err => {
          console.log(err)
        }
      })

    },
    onSubmit(searchData) {
      this.$refs[searchData].validate(valid => {
        if (valid) {
          let formData = this[searchData];
          let data = {};
          const startTime = formData.startTime;
          const endTime = formData.endTime;
          console.log(startTime, endTime)
          if (tool.isEmpty(startTime)) {
            data.startTime = '';
          } else {
            data.startTime = tool.allFormatDate(new Date(startTime), 2);
          }
          if (tool.isEmpty(endTime)) {
            data.endTime = '';
          } else {
            data.endTime = tool.allFormatDate(new Date(endTime), 2)
          }
          console.log(data);
          axios({
            type: 'get',
            path: '/api/money/screeoutMoneyIncomePay',
            data,
            fn: res => {
              console.log(res);
              this.$message('筛选成功')
              this.pageData.total = res.count;
              this.tableData = [];
              res.data.forEach((ele, ind) => {
                let item = {
                  num: (this.pageData.pageIndex - 1) * this.pageData.pageSize + ind + 1,
                  createTime: tool.formatDate(ele.createTime),
                  incomeType: ele.incomePayType,
                  incomeDes: ele.incomePayDes,
                  income: ele.income,
                  accoutCash: ele.accoutCash,
                  pay: ele.pay,
                  remarks: ele.remarks
                }
                this.tableData.push(item);
              })
            },
            errFn: err => {
              console.log(err);
            }
          })
        }
      })

    },
    formatterType(item) {
      //   console.log(item)
      const type = parseInt(item.incomeType);
      //   console.log(type)
      return this.format_type_list[type]
    },
    filterType(value, item) {
      const type = parseInt(item.incomePayType);
      console.log(this.format_type_list[value] == this.format_type_list[type])
      return this.format_type_list[value] == this.format_type_list[type];
    },

    delete() {

    }
  }
}

</script>
<style scoped lang="less">
.captial-flow /deep/ .el-date-editor {
  vertical-align: middle;
}
.captial-flow /deep/ .el-form-item {
  margin-right: 0;
}
.captial-flow /deep/ .el-button {
  margin-left: 10px;
}
.captial-flow {
  .search-box {
    padding: 8px;
    .demo-form-inline {
      .add-btn {
        float: right;
      }
    }
  }
  .split {
    display: inline-block;
    padding: 0 5px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
