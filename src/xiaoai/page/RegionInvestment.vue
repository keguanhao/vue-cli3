<template>
  <div class="region-container">
    <div class="region-box">
      <el-tabs
        v-model="activeName2"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane>
          <span
            slot="label"
            @click="toggleTabs('eastChina')"
          ><i class="fa fa-camera-retro"></i>华东区域</span>
          <table-component :toggleData="toggleData">
            
          </table-component>
        </el-tab-pane>
        <el-tab-pane>
          <span
            slot="label"
            @click="toggleTabs('southChina')"
          ><i class="fa fa-bank"></i>华南区域</span>
          <table-component :toggleData="toggleData"></table-component>
        </el-tab-pane>
        <el-tab-pane>
          <span
            slot="label"
            @click="toggleTabs('centralChina')"
          ><i class="fa fa-cubes"></i>华中区域</span>
          <table-component :toggleData="toggleData"></table-component>
        </el-tab-pane>
        <el-tab-pane>
          <span
            slot="label"
            @click="toggleTabs('northChina')"
          ><i class="fa fa-fax"></i>华北区域</span>
          <table-component :toggleData="toggleData"></table-component>
        </el-tab-pane>
        <el-tab-pane>
          <span
            slot="label"
            @click="toggleTabs('northwestChina')"
          ><i class="fa fa-institution"></i>西北区域</span>
          <table-component :toggleData="toggleData"></table-component>
        </el-tab-pane>
        <el-tab-pane>
          <span
            slot="label"
            @click="toggleTabs('southwestChina')"
          ><i class="fa fa-life-ring"></i>西南地区</span>
          <table-component :toggleData="toggleData"></table-component>
        </el-tab-pane>
        <el-tab-pane>
          <span
            slot="label"
            @click="toggleTabs('northeastChina')"
          ><i class="fa fa-paper-plane"></i>东北地区</span>
          <table-component :toggleData="toggleData"></table-component>
        </el-tab-pane>
        <el-tab-pane>
          <span
            slot="label"
            @click="toggleTabs('specialareaChina')"
          ><i class="fa fa-calendar"></i>台港澳地区</span>
          <table-component :toggleData="toggleData"></table-component>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import TableComponent from '../tables/TableComponent'
export default {
  data() {
    return {
      activeName2: '',
      toggleData: 'eastChina'
    }
  },
  components: {
    TableComponent
  },
  mounted() {
    this.toggleTabs('eastChina');
    console.log(this.toggleData)
  },
  methods: {
    handleClick(val) {
      console.log(val)
    },
    toggleTabs(item) {
      console.log(item)
      this.toggleData = item;
    }
  }
}

</script>
<style scoped>
</style>
