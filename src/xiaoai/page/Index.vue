<template>
  <div>
    <el-row :gutter="1">
      <el-col :span="12">
        <bar-data id="bar"></bar-data>
      </el-col>
      <el-col :span="12">
        <line-data id="line"></line-data>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="8">
        <order-type
          id="ordertype1"
          type="ordertype"
        ></order-type>
      </el-col>
      <el-col :span="8">
        <order-sorce
          id="orderSorce"
          type="ordersorce"
        ></order-sorce>
      </el-col>
      <el-col :span="8">
        <order-type
          id="ordertype2"
          type="areatype"
        ></order-type>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import '../../../node_modules/echarts/theme/macarons.js'
import BarData from '../../components/echarts/BarData'
import LineData from '../../components/echarts/LineData'
import OrderType from '../../components/echarts/OrderType'
import OrderSorce from '../../components/echarts/OrderSorce'
export default {
  data() {
    return {

    }
  },
  mounted() {


  },
  components: {
    BarData,
    LineData,
    OrderType,
    OrderSorce
  },
  methods: {

  }
}

</script>
<style scoped>
</style>
