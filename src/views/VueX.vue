<template>
  <div>
    <p>
      这个是原始值:{{count}}
    </p>
    <button @click="add">点击++</button>
    <button @click="crease">点击--</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
    }
  },
  methods: mapActions(['add', 'crease']),
  computed: mapGetters(['count'])
}

</script>
<style scoped>
</style>
