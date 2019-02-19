<template>
  <div>
    <div></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      myHtml: ''
    }
  },
  mounted() {
    axios.get('/api/5a1Fazu8AA54nxGko9WTAnF6hhy/su?' + `wd=ss&cb='callback'`
    ).then(res => {
      console.log(res.data)

    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    cb() {
      console.log(222)
    }
  }
}

</script>
<style scoped>
</style>
