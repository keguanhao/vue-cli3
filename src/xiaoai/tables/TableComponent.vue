<template>
  <div class="table-box">
    <el-table :data="tableData">
      <el-table-column
        label="序号"
        align="center"
        width="80"
        prop="ID"
        type="index"
      >
        <!-- <template slot-scope="scope">
          {{scope.$index + 1}}
        </template> -->
      </el-table-column>
      <el-table-column
        label="省份"
        align="center"
        width="140"
        prop="provinces"
      >

      </el-table-column>
      <el-table-column
        label="投资总额"
        sortable
        align="center"
        width="120"
        prop="orderMoney"
      >

      </el-table-column>
      <el-table-column
        label="收益金额"
        width="120"
        align="center"
        prop="incomeMoney"
        sortable
      >

      </el-table-column>
      <el-table-column
        label="主要投资项目"
        width="120"
        align="center"
        prop="payType"
      >

      </el-table-column>
      <el-table-column
        label="投资周期"
        prop="orderPeriod"
        align="center"
        width="120"
      >

      </el-table-column>
      <el-table-column
        label="投资人数"
        align="center"
        width="120"
        prop="orderPersonConunt"
      >

      </el-table-column>
      <el-table-column
        label="投资年变化率"
        prop="orderYearRate"
        align="center"
        width="120"
      >

      </el-table-column>
      <el-table-column
        lable="备注"
        align="left"
        prop="remarks"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import data from '../static/data/chinaTabs'
export default {
  data() {
    return {
      tableData: []
    }
  },
  props: {
    toggleData: [String]
  },
  mounted() {
    console.log(this.toggleData);
    console.log(data)
    this.tableData = data.china[this.toggleData]
  },
  methods: {
    rendData(val) {
      console.log(val)
      console.log(data)
      this.tableData = data.china[this.toggleData]
      console.log(this.tableData)
    }
  },
  watch: {
    toggleData(val) {
      console.log(val)
      this.rendData(val)
    }
  }
}

</script>
<style scoped>
</style>
