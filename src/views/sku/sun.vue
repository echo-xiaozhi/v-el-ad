<template>
  <div class="colors">
    <div class="color-item" :class="{active:categoryIndex==item.id}" v-for="item in keyValue" :key="item.id" @click="select(groupKey, item.id)">{{ item.name }}</div>
  </div>
</template>

<script>
export default {
  name: 'sun',

  props: {
    keyValue: {
      type: Array,
      default: {}
    },

    groupKey: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      categoryIndex: 0,
      emitKeyValue: {}
    }
  },

  methods: {
    select(key, val) {
      this.categoryIndex = val
      this.$set(this.emitKeyValue, key, val)
      console.log(this.emitKeyValue)
      // this.$emit('showKeyValue', this.emitKeyValue)
    }
  }
}
</script>
