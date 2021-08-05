<template>
  <div class="app-container">
    <Group :tree="tree" />
  </div>

</template>

<script>
import api from '@/api/skuList'
import Group from './Group'

export default {
  name: "Sku",

  components: {
    Group
  },

  data() {
    return {
      tree: [],
      list: []
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    async fetchData() {
      const res = await api.getList()

      this.tree = res.sku.tree
      this.list = res.sku.list
    },

    selectSku() {
      console.log(1234)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  font-size: 18px;
}
.colors, .sizes {
  display: flex;
  flex-direction: row;
  margin: 20px 0 20px 0;
}
.color-item, .size-item {
  display: block;
  background-color: rgb(128, 186, 219);
  color: white;
  margin: 0 15px 0 0;

  &:hover {
    background-color: violet;
    cursor: pointer;
  }
}
.active {
  background-color: violet;
    cursor: pointer;
}
</style>
