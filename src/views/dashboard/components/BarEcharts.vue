<template>
  <div ref="bar" :class="className" :style="{height: height, width: width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')

import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    height: {
      type: String,
      default: '400px'
    },

    width: {
      type: String,
      default: '100%'
    },

    xaxisData: {
      type: Array,
      default: () => ['前端', 'PHP', 'Python', '大数据', '区块链']
    },

    seriesData: {
      type: Array,
      default: () => [36, 20, 10, 5, 4]
    },

    className: {
      type: String,
      default: 'chart'
    },

  },

  data() {
    return {
      chart: null
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.showBar()
    })
  },

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },

  methods: {
    showBar() {
      // 基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(this.$refs.bar, 'macarons');
        // 绘制图表
        this.chart.setOption({
          title: {
              text: '博客文章数量'
          },
          tooltip: {},
          xAxis: {
              data: this.xaxisData
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: this.seriesData
          }]
        })
    }
  }
}
</script>
