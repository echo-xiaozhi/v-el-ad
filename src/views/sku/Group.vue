<template>
<div>
  <div>
    <div v-for="item in tree" :key="item.k_s">
      {{ item.k }}
      <sun :keyValue="item.v" :groupKey="item.k_s" @showKeyValue='updateCity' />
    </div>
  </div>
</div>
</template>

<script>
import sun from './sun'

export default {
  name: 'group',

  components: {
    sun
  },

  props: {
    tree: {
      type: Array,
      default: []
    }
  },

  methods: {
    updateCity(res) {
      console.log(res)
    }
  }
}
</script>
