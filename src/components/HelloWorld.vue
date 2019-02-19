<template>
  <div class="hello">
    <button @click="upload">点击下载</button>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    upload() {
      window.open("https://codeload.github.com/douban/douban-client/legacy.zip/master")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
